import path from "node:path"
import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ConfigServer } from "@spt/servers/ConfigServer"
import { ConfigTypes } from "@spt/models/enums/ConfigTypes"
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig"
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables"
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";

import { VFS } from "@spt/utils/VFS"

import { jsonc } from "jsonc"
const debug = false // [Debug] Debug!
class Mod implements IPostDBLoadMod
{
    public preSptLoad(container: DependencyContainer): void 
    {
        // Database will be empty in here
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const logger = container.resolve<ILogger>("WinstonLogger");
        logger.logWithColor(`Database item table state: ${databaseServer.getTables().templates} (<<< should be undefined)`, LogTextColor.RED, LogBackgroundColor.YELLOW);

    }

    public postDBLoad(container: DependencyContainer): void 
    {
        const vfs = container.resolve<VFS>("VFS")
        const config = jsonc.parse(vfs.readFile(path.resolve(__dirname, "../config/config.jsonc")))
        const logger = container.resolve<ILogger>("WinstonLogger")
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer") 
        const tables: IDatabaseTables = databaseServer.getTables()
        const locales = tables.locales.global
        const items = tables.templates.items  
        const globals = tables.globals.config  
        const prapor = tables.traders["54cb50c76803fa8b248b4571"]
        const therapist = tables.traders["54cb57776803fa99248b456e"]
        const ragman = tables.traders["5ac3b934156ae10c4430e83c"]
        const jaeger = tables.traders["5c0647fdd443bc2504c2d371"]
        const mechanic = tables.traders["5a7c2eca46aef81a7ca2145d"]
        const peacekeeper = tables.traders["5935c25fb3acc3127c3d8cd9"]
        const skier = tables.traders["58330581ace78e27b8b10cee"]
        const ref = tables.traders["6617beeaa9cfa777ca915b7c"]
        const traderlist = [prapor, therapist, ragman, jaeger, mechanic, peacekeeper, skier, ref]


        if (config.TraderChanges.enabled) 
        {
            if (config.TraderChanges.Better_Sales_To_Traders.enabled) 
            {
                if (debug) 
                {
                    for (const trader in traderlist) 
                    {
                        log(`${traderlist[trader].base.nickname}.base.items_buy = {`)
                        log("\"category\": [")
                        traderlist[trader].base.items_buy.category.forEach((x) => log(`"${x}", // ${getItemName(x)}`))
                        log("],")
                        log("\"id_list\": [")
                        traderlist[trader].base.items_buy.id_list.forEach((x) => log(`"${x}", // ${getItemName(x)}`))
                        log("]}")
                    }
                }
                if (debug) 
                {
                    for (const trader in traderlist) 
                    {
                        log(`${traderlist[trader].base.nickname}.base.sell_category = [`)
                        traderlist[trader].base.sell_category.forEach((x) => log(`"${x}", // ${locales["en"][x]}`))
                        // traderlist[trader].base.sell_category.forEach((x) => log(locales["en"][`${x}`]))
                        log("]")
                    }
                    //
                    for (const trader in traderlist) 
                    {
                        log(`${traderlist[trader].base.nickname}: ${100 - traderlist[trader].base.loyaltyLevels[3].buy_price_coef}%`)
                    }
                }

                try 
                {
                    for (const trader in traderlist) 
                    {
                        traderlist[trader].base.loyaltyLevels[0].buy_price_coef = 35
                        traderlist[trader].base.loyaltyLevels[1].buy_price_coef = 30
                        traderlist[trader].base.loyaltyLevels[2].buy_price_coef = 25
                        traderlist[trader].base.loyaltyLevels[3].buy_price_coef = 20
                    }

                    peacekeeper.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                    skier.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                    prapor.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                    mechanic.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                    jaeger.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                    ragman.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                    therapist.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                }
                catch (error) 
                {
                    logger.warning("\nTraderChanges.BetterSalesToTraders failed. Send bug report. Continue safely.")
                    log(error)
                }
            }

            if (config.TraderChanges.Reasonably_Priced_Cases.enabled == true) 
            {
                try 
                {
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d2497"][0].forEach((x) => (x.count = 5)) // T H I C C item case (LEDX) 5c0a840b86f7742ffa4f2482
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d24d3"][0].forEach((x) => (x.count = 10)) // T H I C C item case (Moonshine)5c0a840b86f7742ffa4f2482
                    therapist.assort.barter_scheme["666aa326e8e00edadd0d2473"][0].forEach((x) => (x.count = 7256)) // Item case (Euro) 13839 59fb042886f7746c5005a7b2
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d249d"][0].forEach((x) => (x.count = 8)) // Item case (OScope) 59fb042886f7746c5005a7b2
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d24b2"][0].forEach((x) => (x.count = 25)) // Item case (Dogtags) 59fb042886f7746c5005a7b2
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d24af"][0].forEach((x) => (x.count = 20)) // Lucky Scav Junk box (Dogtags) 5b7c710788a4506dec015957
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d2494"][0].forEach((x) => (x.count = 961138)) // Lucky Scav Junk box (Rubles) 1106138 5b7c710788a4506dec015957
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d249a"][0].forEach((x) => (x.count = 290610)) // Medcase (Rubles) 5aafbcd986f7745e590fff23
                    therapist.assort.barter_scheme["666aa328e8e00edadd0d2518"][0].forEach((x) => (x.count /= 25)) // LEDX (Dogtags) // Really BSG? 160 kills for a non-FIR item? REALLY?! 5c0530ee86f774697952d952

                    peacekeeper.assort.barter_scheme["6492e44bf4287b13040fca51"][0].forEach((x) => (x.count = Math.round(x.count / 5 + 1))) // THICC case (SMT+Bluefolder+SecureFlashDrive) 5c0a840b86f7742ffa4f2482

                    skier.assort.barter_scheme["666aa2e0e8e00edadd0d03f6"][0].forEach((x) => (x.count = 4)) // Weapon case (Moonshine) 59fb023c86f7746d0d4b423c
                }
                catch (error) 
                {
                    logger.warning("\nTraderChanges.Reasonably_Priced_Cases failed. Send bug report. Continue safely.")
                    log(error)
                }
            }

            if (config.TraderChanges.Bigger_Limits.enabled == true) 
            {
                try 
                {
                // mark

                    for (const trader in traderlist) 
                    {
                        for (const item in traderlist[trader].assort.items) 
                        {
                        // log(traderlist[trader].assort.items[item])
                            if (traderlist[trader].assort.items[item]?.upd?.BuyRestrictionMax) 
                            {
                                traderlist[trader].assort.items[item].upd.BuyRestrictionMax *= config.TraderChanges.Bigger_Limits.Limit_Multiplier
                            }
                        }
                    }
                }
                catch (error) 
                {
                    logger.warning("\nTraderChanges.Bigger_Limits failed. Send bug report. Continue safely.")
                    log(error)
                }
            }
            if (config.EconomyOptions.Disable_Flea_Market_Completely.disable) 
            {
                try 
                {
                    globals.RagFair.minUserLevel = 99
                }
                catch (error) 
                {
                    logger.warning("\nEconomyOptions.Disable_Flea_Market_Completely failed. Send bug report. Continue safely.")
                    log(error)
                }
            }
            else 
            {
                try 
                {
                    globals.RagFair.minUserLevel = config.EconomyOptions.Fleamarket_Opened_at_Level.value
                }
                catch (error) 
                {
                    logger.warning("\nEconomyOptions.Fleamarket_Opened_at_Level failed. Send bug report. Continue safely.")
                    log(error)
                }
                
            }
            if (config.TraderChanges.Alternative_Categories.enabled) 
            {
                try 
                {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    therapist.base.items_buy.category = [
                        "543be5664bdc2dd4348b4569",
                        "5448f3a14bdc2d27728b4569",
                        "5448f39d4bdc2d0a728b4568",
                        "5448f3a64bdc2d60728b456a",
                        "57864c8c245977548867e7f1",
                        "5448e8d64bdc2dce718b4568",
                        "543be6674bdc2df1348b4569",
                        "5448e8d04bdc2ddf718b4569",
                        "5448ecbe4bdc2d60728b4568",
                        "5d650c3e815116009f6201d2",
                        "543be5e94bdc2df1348b4568",
                        "5c99f98d86f7745c314214b3",
                        "5c164d2286f774194c5e69fa",
                        "59f32c3b86f77472a31742f0",
                        "59f32bb586f774757e1e8442",
                        "57864ada245977548638de91",
                        "57864bb7245977548b3b66c2",
                        "57864c322459775490116fbf",
                        "57864e4c24597754843f8723",
                        "57864ee62459775490116fc1",
                        "590c745b86f7743cc433c5f2",
                        "567849dd4bdc2d150f8b456e",
                        "5f4fbaaca5573a5ac31db429",
                        "54009119af1c881c07000029"
                    ],
                    skier.base.items_buy.category = [
                        "5448ecbe4bdc2d60728b4568",
                        "5448fe124bdc2da5018b4567",
                        "550aa4154bdc2dd8348b456b",
                        "5d650c3e815116009f6201d2",
                        "5a2c3a9486f774688b05e574",
                        "5d21f59b6dbe99052b54ef83",
                        "543be5e94bdc2df1348b4568",
                        "5c99f98d86f7745c314214b3",
                        "5c164d2286f774194c5e69fa",
                        "543be6564bdc2df4348b4568",
                        "5422acb9af1c889c16000029",
                        "5448e54d4bdc2dcc718b4568",
                        "57bef4c42459772e8d35a53b",
                        "5a341c4086f77401f2541505",
                        "5a341c4686f77469e155819e",
                        "5448e5284bdc2dcb718b4567",
                        "5448e5724bdc2ddf718b4568",
                        "5485a8684bdc2da71d8b4567",
                        "543be5cb4bdc2deb348b4568",
                        "5b3f15d486f77432d0509248",  
                        "59f32c3b86f77472a31742f0",
                        "59f32bb586f774757e1e8442",
                        "57864a3d24597754843f8721",
                        "57864ee62459775490116fc1",
                        "590c745b86f7743cc433c5f2",
                        "567849dd4bdc2d150f8b456e",
                        "616eb7aea207f41933308f46",
                        "5645bcb74bdc2ded0b8b4578",
                        "5447e0e74bdc2d3c308b4567",
                        "54009119af1c881c07000029"
                    ],
                    mechanic.base.items_buy.category = [
                        "5448ecbe4bdc2d60728b4568",
                        "5448fe124bdc2da5018b4567",
                        "550aa4154bdc2dd8348b456b",
                        "5d650c3e815116009f6201d2",
                        "5a2c3a9486f774688b05e574",
                        "5d21f59b6dbe99052b54ef83",
                        "543be5e94bdc2df1348b4568",
                        "5c99f98d86f7745c314214b3",
                        "5c164d2286f774194c5e69fa",
                        "5422acb9af1c889c16000029",
                        "5485a8684bdc2da71d8b4567",
                        "543be5cb4bdc2deb348b4568",
                        "57864a66245977548f04a81f",
                        "57864bb7245977548b3b66c2",
                        "57864e4c24597754843f8723",
                        "57864ee62459775490116fc1",
                        "590c745b86f7743cc433c5f2",
                        "567849dd4bdc2d150f8b456e",
                        "616eb7aea207f41933308f46",
                        "5447e0e74bdc2d3c308b4567",
                        "54009119af1c881c07000029"
                    ],
                    prapor.base.items_buy.category = [
                        "5448ecbe4bdc2d60728b4568",
                        "5d650c3e815116009f6201d2",
                        "5a2c3a9486f774688b05e574",
                        "5d21f59b6dbe99052b54ef83",
                        "543be5e94bdc2df1348b4568",
                        "5c99f98d86f7745c314214b3",
                        "5c164d2286f774194c5e69fa",
                        "543be6564bdc2df4348b4568",
                        "5422acb9af1c889c16000029",
                        "5b3f15d486f77432d0509248",
                        "59f32bb586f774757e1e8442",
                        "567849dd4bdc2d150f8b456e",
                        "5485a8684bdc2da71d8b4567",
                        "543be5cb4bdc2deb348b4568",
                        "5448e54d4bdc2dcc718b4568",
                        "57bef4c42459772e8d35a53b",
                        "5a341c4086f77401f2541505",
                        "5448e5284bdc2dcb718b4567",
                        "5448fe124bdc2da5018b4567",
                        "5447e0e74bdc2d3c308b4567",
                        "54009119af1c881c07000029"
                    ],
                    ragman.base.items_buy.category = [
                        "5448ecbe4bdc2d60728b4568",
                        "5d650c3e815116009f6201d2",
                        "543be5f84bdc2dd4348b456a",
                        "5448e54d4bdc2dcc718b4568",
                        "57bef4c42459772e8d35a53b",
                        "5a341c4086f77401f2541505",
                        "5a341c4686f77469e155819e",
                        "5448e5284bdc2dcb718b4567",
                        "5448e53e4bdc2d60728b4567",
                        "5448e5724bdc2ddf718b4568",
                        "5b3f15d486f77432d0509248",
                        "57864a3d24597754843f8721",
                        "616eb7aea207f41933308f46",
                        "5645bcb74bdc2ded0b8b4578",
                        "54009119af1c881c07000029"
                    ],
                    jaeger.base.items_buy.category = [
                        "5a341c4686f77469e155819e",
                        "543be5664bdc2dd4348b4569",
                        "5448f3a14bdc2d27728b4569",
                        "5448f39d4bdc2d0a728b4568",
                        "57864c8c245977548867e7f1",
                        "5448e8d64bdc2dce718b4568",
                        "543be6674bdc2df1348b4569",
                        "5448e8d04bdc2ddf718b4569",
                        "5422acb9af1c889c16000029",
                        "5448e53e4bdc2d60728b4567",
                        "5448eb774bdc2d0a728b4567",
                        "5448ecbe4bdc2d60728b4568",
                        "5d650c3e815116009f6201d2",
                        "5a2c3a9486f774688b05e574",
                        "5d21f59b6dbe99052b54ef83",
                        "543be5e94bdc2df1348b4568",
                        "5c99f98d86f7745c314214b3",
                        "5c164d2286f774194c5e69fa",
                        "5485a8684bdc2da71d8b4567",
                        "543be5cb4bdc2deb348b4568",
                        "57864bb7245977548b3b66c2",
                        "57864ada245977548638de91",
                        "57864e4c24597754843f8723",
                        "57864ee62459775490116fc1",
                        "590c745b86f7743cc433c5f2",
                        "567849dd4bdc2d150f8b456e",
                        "616eb7aea207f41933308f46",
                        "5f4fbaaca5573a5ac31db429",
                        "5645bcb74bdc2ded0b8b4578",
                        "5448fe124bdc2da5018b4567",
                        "5447e0e74bdc2d3c308b4567",
                        "5447e1d04bdc2dff2f8b4567",
                        "54009119af1c881c07000029"
                    ],
                    peacekeeper.base.items_buy.category = [
                        "5448ecbe4bdc2d60728b4568",
                        "5d650c3e815116009f6201d2",
                        "5a2c3a9486f774688b05e574",
                        "5d21f59b6dbe99052b54ef83",
                        "543be5e94bdc2df1348b4568",
                        "5c99f98d86f7745c314214b3",
                        "5c164d2286f774194c5e69fa",
                        "543be6564bdc2df4348b4568",
                        "5422acb9af1c889c16000029",
                        "5b3f15d486f77432d0509248",
                        "59f32c3b86f77472a31742f0",
                        "567849dd4bdc2d150f8b456e",
                        "5485a8684bdc2da71d8b4567",
                        "543be5cb4bdc2deb348b4568",
                        "5448e54d4bdc2dcc718b4568",
                        "57bef4c42459772e8d35a53b",
                        "5a341c4086f77401f2541505",
                        "5448e5284bdc2dcb718b4567",
                        "5448fe124bdc2da5018b4567",
                        "5447e0e74bdc2d3c308b4567",
                        "54009119af1c881c07000029"
                    ],
                    ref.base.items_buy.category = [
                        "5448ecbe4bdc2d60728b4568",
                        "5d650c3e815116009f6201d2",
                        "5a2c3a9486f774688b05e574",
                        "5d21f59b6dbe99052b54ef83",
                        "543be5e94bdc2df1348b4568",
                        "5c99f98d86f7745c314214b3",
                        "5c164d2286f774194c5e69fa",
                        "543be6564bdc2df4348b4568",
                        "5422acb9af1c889c16000029",
                        "5b3f15d486f77432d0509248",
                        "59f32c3b86f77472a31742f0",
                        "567849dd4bdc2d150f8b456e",
                        "5485a8684bdc2da71d8b4567",
                        "543be5cb4bdc2deb348b4568",
                        "5448e54d4bdc2dcc718b4568",
                        "57bef4c42459772e8d35a53b",
                        "5a341c4086f77401f2541505",
                        "5448e5284bdc2dcb718b4567",
                        "5448fe124bdc2da5018b4567",
                        "5447e0e74bdc2d3c308b4567",
                        "54009119af1c881c07000029"
                    ]
                }
                catch (error) 
                {
                    logger.warning("\nTraderChanges.AlternativeCategories failed. Send bug report. Continue safely.")
                    log(error)
                }
            }
            
        }
        function getItemName(itemID, locale = "en") 
        {
            if (locales[locale][`${itemID} Name`] != undefined) 
            {
                // return items[itemID]._name
                return locales[locale][`${itemID} Name`]
            }
            else 
            {
                return items[itemID]?._name
            }
        }
    }
}
const log = (i: any) => 
{
    console.log(i)
}


export const mod = new Mod()
