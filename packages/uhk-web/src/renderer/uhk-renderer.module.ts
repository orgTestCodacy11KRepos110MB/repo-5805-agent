import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LogService } from 'uhk-common';
import { ElectronDataStorageRepositoryService } from './services/electron-datastorage-repository.service';
import { ElectronLogService } from './services/electron-log.service';
import { ElectronErrorHandlerService } from './services/electron-error-handler.service';
import { MainAppComponent, routing } from '../../';
import { IpcUhkRenderer } from './services/ipc-uhk-renderer';
import { IpcCommonRenderer } from '../app/services/ipc-common-renderer';
import { DataStorageRepositoryService } from '../app/services/datastorage-repository.service';
import { SharedModule } from '../app/shared.module';
import { reducers } from '../app/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { effects } from '../app/store/effects';
import { CustomRouterStateSerializer } from '../app/store/router-util';

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        routing,
        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule.forRoot({
            serializer: CustomRouterStateSerializer
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 10
        }),
        EffectsModule.forRoot(effects)
    ],
    providers: [
        {provide: DataStorageRepositoryService, useClass: ElectronDataStorageRepositoryService},
        {provide: IpcCommonRenderer, useClass: IpcUhkRenderer},
        {provide: LogService, useClass: ElectronLogService},
        {provide: ErrorHandler, useClass: ElectronErrorHandlerService}
    ],
    bootstrap: [MainAppComponent]
})
export class UhkRendererModule {
}
