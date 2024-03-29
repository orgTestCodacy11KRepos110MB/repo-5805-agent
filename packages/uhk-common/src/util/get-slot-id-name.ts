import { ModuleSlotToId } from '../models/module-slot-id.js';

export function getSlotIdName(slotId: ModuleSlotToId): string  {
    switch (slotId) {
        case ModuleSlotToId.leftHalf:
            return 'leftHalf';

        case ModuleSlotToId.leftModule:
            return 'leftModule';

        case ModuleSlotToId.rightModule:
            return 'rightModule';

        default:
            return `Unknown slotId: ${slotId}`;
    }
}
