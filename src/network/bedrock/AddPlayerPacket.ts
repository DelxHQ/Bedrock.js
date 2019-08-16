import Packet from '@/network/bedrock/Protocol'
import EncapsulatedPacket from '@/network/raknet/EncapsulatedPacket'

export default class AddPlayerPacket extends EncapsulatedPacket {

    private uuid: string | null = null
    private username: string | null = null

    private entityIdSelf: number | null = null
    private runtimeEntityId: number | null = null

    private platformId: string | null = null

    private x: number | null = null
    private y: number | null = null
    private z: number| null = null 

    private speedX: number | null = null
    private speedY: number | null = null
    private speedZ: number | null = null

    private pitch: number | null = null
    private yaw: number | null = null
    private headYaw: number | null = null

    private item = 0
  
  constructor() {
    super(Packet.ADD_PLAYER)
  }

}
