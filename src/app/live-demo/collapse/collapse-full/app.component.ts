import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";
import {Http} from "@angular/http";
import {LineBarGraphData, PieGraphDataByColumn} from "jigsaw/core/data/graph-data";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class CollapseFullComponent {
    tableData: TableData;
    public pieGraphDataByCol: PieGraphDataByColumn;
    public lineBarGraphData: LineBarGraphData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');

        this.pieGraphDataByCol = new PieGraphDataByColumn();
        this.pieGraphDataByCol.http = http;
        this.pieGraphDataByCol.fromAjax('mock-data/graph/marketing.json');

        this.lineBarGraphData = new LineBarGraphData();
        this.lineBarGraphData.http = http;
        this.lineBarGraphData.fromAjax('mock-data/graph/marketing.json');
    }

    goodsList = [
        {
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.',
            active: true
        },
        {
            name: 'camera',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
        },
        {
            name: 'football',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        {
            name: 'book',
            desc: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.'
        },
        {
            name: 'puzzle-piece',
            desc: 'A puzzle is a game, problem, or toy that tests a person\'s ingenuity or knowledge.'
        },
    ];

}
