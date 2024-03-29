import { ModuleSlotToI2cAddress } from '../models/module-slot-to-i2c-adress.js';
import { ModuleSlotToId } from '../models/module-slot-id.js';
import { toHexString } from './to-hex-string.js';

export function mapI2cAddressToSlotId(address: ModuleSlotToI2cAddress): ModuleSlotToId {
    switch (address) {
        case ModuleSlotToI2cAddress.leftHalf:
            return ModuleSlotToId.leftHalf;

        case ModuleSlotToI2cAddress.leftTouchpad:
            return ModuleSlotToId.leftModule;

        case ModuleSlotToI2cAddress.leftModule:
            return ModuleSlotToId.leftModule;

        case ModuleSlotToI2cAddress.rightTouchpad:
            return ModuleSlotToId.rightModule;

        case ModuleSlotToI2cAddress.rightModule:
            return ModuleSlotToId.rightModule;

        default:
            throw new Error(`Can't map I2C Address: ${toHexString(address as number)} to module slot ID!`);
    }
}
