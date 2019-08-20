enum Protocol {
  LOGIN = 0x01, // 1
  PLAY_STATUS = 0x02, // 2
  SERVER_TO_CLIENT_HANDSHAKE = 0x03, // 3
  CLIENT_TO_SERVER_HANDSHAKE = 0x04, // 4
  DISCONNECT = 0x05, // 5
  RESOURCE_PACKS_INFO_PACKET  = 0x06, // 6

  RESOURCE_PACK_CLIENT_RESPONSE = 0x08,

  SET_TIME = 0x0a, // 10
  START_GAME = 0x0b, // 11
  ADD_PLAYER = 0x0c, // 12

  SET_HEALTH = 0x2a, // 42

  SET_DIFFICULTY = 0x3c, // 60

  SET_TITLE = 0x58, // 88

  AVAILABLE_ENTITY_IDENTIFIERS = 0x77, // 119
}

export default Protocol
