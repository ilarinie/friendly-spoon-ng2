import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { routing } from './app.routes';
import { HttpModule } from '@angular/http';
import { Authentication } from './authentication/authentication';



@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        routing,
        HttpModule
    ],
    bootstrap: [AppComponent],
    providers: [Authentication],
})
export class AppModule { }
