import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MockdatawebpartWebPart.module.scss';
import * as strings from 'MockdatawebpartWebPartStrings';

import { StockInfoClient } from "./StockInfoClient";

export interface IMockdatawebpartWebPartProps {
  description: string;
}

export interface StockInfo {
  Symbol: string;
  Name: string;
  Date: string;
  Price: number
}

export interface StockList {
  data: StockInfo[];
}







export default class MockdatawebpartWebPart extends BaseClientSideWebPart<IMockdatawebpartWebPartProps> {

private getStockList() : Promise<StockList> {
  return StockInfoClient.getitems()
  .then((list: StockInfo[]) => {
    var info : StockList = {data: list};
    return info;
  }) as Promise<StockList>;
}

private renderStockList(items: StockInfo[]) : void { 
  let html : string = "";
  items.forEach((item : StockInfo) => { 
    html += `<ul>
                <li class="">
                  <span>${item.Symbol}</span>
                  <span>${item.Name}</span>
                  <span>${item.Price}</span>
                  <span>${item.Date}</span>
                </li>
              </ul>`
  });

  this.domElement.querySelector("#stockInfoContainer").innerHTML = html;

}

private renderDataAsync() : void { 
  this.getStockList().then((allstocks) => {    
      this.renderStockList(allstocks.data);
    
  });

}




  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.mockdatawebpart }">
        <div class="${ styles.container }">
        <div class="${ styles.row }">
          <div class="${ styles.column }">
            <span class="${ styles.title }">Welcome to SharePoint!</span>
            <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Partss.</p>
            <p class="${ styles.description }">${escape(this.properties.description)}</p>          
            <a href="https://aka.ms/spfx" class="${ styles.button }">
              <span class="${ styles.label }">Learn more</span>
            </a>
          </div>
        </div>  
        <div id="stockInfoContainer"></div>
        </div>
      </div>`;

  this.renderDataAsync();

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
