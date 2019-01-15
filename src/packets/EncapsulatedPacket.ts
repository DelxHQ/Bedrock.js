import Packet from "@/Packet"
import { BinaryStream } from "@/utils"
import Reliability from "@/Reliability"

export default class EncapsulatedPacket extends Packet {

  public reliability: number = 0

  public length: number = 0

  public messageIndex: number = 0

  public hasSplit: boolean = false
  public splitCount: number = 0
  public splitId: number = 0
  public splitIndex: number = 0

  public sequenceIndex: number = 0

  public orderIndex: number = 0
  public orderChannel: number = 0

  constructor(id: number, stream?: BinaryStream) {
    super(id, stream)
    // this.getStream().increaseOffset(1)
  }

  isReliable() {
    return (
      this.reliability === Reliability.Reliable ||
      this.reliability === Reliability.ReliableOrdered ||
      this.reliability === Reliability.ReliableSequenced ||
      this.reliability === Reliability.ReliableACK ||
      this.reliability === Reliability.ReliableOrderedACK
    )
  }

  isSequenced() {
    return (
      this.reliability === Reliability.UnreliableSequenced ||
      this.reliability === Reliability.ReliableSequenced
    )
  }

  isOrdered() {
    return (
      this.reliability === Reliability.ReliableOrdered ||
      this.reliability === Reliability.ReliableOrderedACK
    )
  }

  isSequencedOrOrdered() {
    return this.isSequenced() || this.isOrdered()
  }

  toBinary() {
    const stream = new BinaryStream()
    console.log('split', this.hasSplit)
    stream.writeByte((this.reliability << 5) | (this.hasSplit ? 0x10 : 0))
    stream.writeShort(stream.length << 3)

    if (this.isReliable()) {
      stream.writeLTriad(this.messageIndex)
    }

    if (this.isSequenced()) {
      stream.writeLTriad(this.sequenceIndex);
    }

    if (this.isSequencedOrOrdered()) {
      stream.writeLTriad(this.orderIndex);
      stream.writeByte(this.orderChannel);
    }

    if (this.hasSplit) {
      stream.writeInt(this.splitCount);
      stream.writeShort(this.splitId);
      stream.writeInt(this.splitIndex);
    }

    const packetStream = this.encode()
    console.log('STREAM', packetStream.buffer)

    return stream.append(packetStream)
  }

  static fromEncapsulated<T extends EncapsulatedPacket>(this: { new(stream: BinaryStream): T }, encapsulated: EncapsulatedPacket): T {
    const packet = new this(encapsulated.getStream())
    packet.reliability = encapsulated.reliability
    packet.length = encapsulated.length
    packet.messageIndex = encapsulated.messageIndex
    packet.hasSplit = encapsulated.hasSplit
    packet.splitCount = encapsulated.splitCount
    packet.splitId = encapsulated.splitId
    packet.splitIndex = encapsulated.splitIndex
    packet.sequenceIndex = encapsulated.sequenceIndex
    packet.orderIndex = encapsulated.orderIndex
    packet.orderChannel = encapsulated.orderChannel

    return packet
  }

  static fromBinary(stream: BinaryStream) {
    const flags = stream.readByte()
    const packet = new EncapsulatedPacket(flags)

    packet.reliability = ((flags & 0xe0) >> 5)
    packet.hasSplit = (flags & 0x10) > 0

    packet.length = Math.ceil(stream.readShort() / 8)

    if (packet.isReliable()) {
      packet.messageIndex = stream.readLTriad()
    }

    if (packet.isSequenced()) {
      packet.sequenceIndex = stream.readLTriad()
    }

    if (packet.isSequencedOrOrdered()) {
      packet.orderIndex = stream.readLTriad()
      packet.orderChannel = stream.readByte()
    }

    if (packet.hasSplit) {
      packet.splitCount = stream.readInt()
      packet.splitId = stream.readShort()
      packet.splitIndex = stream.readInt()
    }

    packet.setStream(new BinaryStream(stream.buffer.slice(stream.offset, stream.offset + packet.length)), true)
    stream.offset += packet.length

    return packet
  }

}