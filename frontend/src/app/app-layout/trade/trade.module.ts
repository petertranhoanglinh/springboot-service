import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradeRoutingModule } from './trade-routing.module';
import { TradingComponent } from './trading/trading.component';
import { ConnectApiComponent } from './connect-api/connect-api.component';
import { AccountInfoComponent } from './account-info/account-info.component';

import { FormsModule } from '@angular/forms';
import { ChatTingComponent } from './chat-ting/chat-ting.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { coinFeatureKey, coinReducer } from 'src/app/reducers/coin.reducer';
import { CoinEffect } from 'src/app/effects/coin.effect';
import { TestPriceComponent } from './test-price/test-price.component';
import { SettingTradeComponent } from './setting-trade/setting-trade.component';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  declarations: [
    TradingComponent,
    ConnectApiComponent,
    AccountInfoComponent,
    ChatTingComponent,
    TestPriceComponent,
    SettingTradeComponent
  ],
  imports: [
    CommonModule,
    TradeRoutingModule,
    FormsModule,
    ComponentsModule,
    StoreModule.forFeature(coinFeatureKey,coinReducer),
    EffectsModule.forFeature([CoinEffect]),
  ]
})
export class TradeModule { }