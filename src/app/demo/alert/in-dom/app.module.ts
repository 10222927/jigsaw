import {NgModule} from "@angular/core";
import {JigsawAlertModule} from "jigsaw/component/alert/alert";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {AlertInDomDemoComponent} from "./app.component";

@NgModule({
    declarations: [AlertInDomDemoComponent],
    exports: [ AlertInDomDemoComponent ],
    imports: [
        JigsawAlertModule, JigsawDemoDescriptionModule
    ]
})
export class AlertInDomDemoModule {
}
