import { runInElectron } from '../util/index.js';

import { LeftSlotModules } from './left-slot-modules.js';
import { RightSlotModules } from './right-slot-modules.js';

export interface HalvesInfo {
    areHalvesMerged: boolean;
    leftModuleSlot: LeftSlotModules;
    isLeftHalfConnected: boolean;
    rightModuleSlot: RightSlotModules;
}

export function getDefaultHalvesInfo(): HalvesInfo {
    if (runInElectron()) {
        return {
            isLeftHalfConnected: true,
            leftModuleSlot: LeftSlotModules.NoModule,
            areHalvesMerged: false,
            rightModuleSlot: RightSlotModules.NoModule
        };
    }

    return {
        isLeftHalfConnected: true,
        leftModuleSlot: LeftSlotModules.KeyClusterLeft,
        areHalvesMerged: false,
        rightModuleSlot: RightSlotModules.TrackpointRight
    };
}
