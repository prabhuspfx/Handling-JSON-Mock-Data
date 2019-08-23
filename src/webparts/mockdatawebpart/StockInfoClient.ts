import { StockInfo } from "./MockdatawebpartWebPart";

export class StockInfoClient {
    private static items: StockInfo[] = 
    [
      {
        Symbol: "MSFT",
        Name: "Microsoft",
        Date: "15/07/2019",
        Price: 138.83
      },
  
      {
        Symbol: "GE",
        Name: "Global Electricals",
        Date: "22/01/2020",
        Price: 145.83
      },
  
      {
        Symbol: "REL",
        Name: "Reliance Company",
        Date: "11/01/2020",
        Price: 453.2
      }
  
  
    ];
  
    public static getitems() : Promise<StockInfo[]>
    {
      return new Promise<StockInfo[]>((resolve) => {
          resolve(StockInfoClient.items);
      }
    );
    }
}

  