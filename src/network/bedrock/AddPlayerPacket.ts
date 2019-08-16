import Packet from '@/network/bedrock/Protocol'
import EncapsulatedPacket from '@/network/raknet/EncapsulatedPacket'

export default class AddPlayerPacket extends EncapsulatedPacket {

    private uuid: string | null = null
    public username: string | null = null

    private entityIdSelf: number | null = null
    private runtimeEntityId: number | null = null

    private platformId: string | null = null

    private x: number | null = null
    private y: number | null = null
    private z: number| null = null 

    private speedX: number | null = null
    private speedY: number | null = null
    private speedZ: number | null = null

    private pitch: number = 0.0
    private yaw: number = 0.0
    private headYaw = null

    private item = 0

    private metadata = []
  
  constructor() {
    super(Packet.ADD_PLAYER)
  }

  protected encodeBody() {
      //
  }

}
