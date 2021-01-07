/**
 * Libp2p Bundle
 * @memberof module:net/peer
 */

import { Libp2pNodeOptions } from '../lib/net/peer/libp2pnode'
// types currently unavailable or conflicting for below libp2p deps,
// tracking issue: https://github.com/libp2p/js-libp2p/issues/659
const LibP2p = require('libp2p')
const LibP2pWebsockets = require('libp2p-websockets')
const LibP2pBootstrap = require('libp2p-bootstrap')
const mplex = require('libp2p-mplex')
const secio = require('libp2p-secio')

export class Libp2pNode extends LibP2p {
  constructor(options: Libp2pNodeOptions) {
    super({
      peerId: options.peerId,
      addresses: options.addresses,
      modules: {
        transport: [LibP2pWebsockets],
        streamMuxer: [mplex],
        connEncryption: [secio],
        peerDiscovery: [LibP2pBootstrap],
      },
      config: {
        peerDiscovery: {
          autoDial: true,
          [LibP2pBootstrap.tag]: {
            interval: 2000,
            enabled: options.bootnodes && options.bootnodes.length > 0,
            list: options.bootnodes ?? [],
          },
        },
      },
    })
  }
}
