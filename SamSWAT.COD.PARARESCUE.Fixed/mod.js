"use strict";

let mydb;

class Mod {
    async postDBLoadAsync(container) {
        const db = container.resolve("DatabaseServer").getTables();
        const modLoader = container.resolve("PreSptModLoader");
        const importerUtil = container.resolve("ImporterUtil");
        const locales = db.locales.global;
        const items = db.templates.items;

        mydb = await importerUtil.loadRecursiveAsync(`${modLoader.getModPath("SamSWAT.COD.PARARESCUE.Fixed")}database/`);
        db.templates.items["55d7217a4bdc2d86028b456d"]._props.Slots[5]._props.filters[0].Filter.push("helmet_mp_western_milsim_pj_1_1");
        db.templates.items["55d7217a4bdc2d86028b456d"]._props.Slots[13]._props.filters[0].Filter.push("glasses_mp_western_milsim_pj_1_1");

        for (const item in mydb.templates.items) {
            items[item] = mydb.templates.items[item];
        }

        for (const item of mydb.templates.handbook.Items) {
            db.templates.handbook.Items.push(item);
        }

        for (const locale of Object.values(locales)) {
            for (const [itemId, template] of Object.entries(mydb.locales.en.templates)) {
                for (const [key, value] of Object.entries(template)) {
                    locale[`${itemId} ${key}`] = value;
                }
            }
        }

        for (const item in mydb.templates.customization) {
            db.templates.customization[item] = mydb.templates.customization[item];
        }

        for (const suit of mydb.traders.ragman.suits) {
            db.traders["5ac3b934156ae10c4430e83c"].suits.push(suit);
        }
		
		for (const item of mydb.traders.assort.assorts.items) {
            db.traders[mydb.traders.assort.traderId].assort.items.push(item);
        }

        for (const bc in mydb.traders.assort.assorts.barter_scheme) {
            db.traders[mydb.traders.assort.traderId].assort.barter_scheme[bc] = mydb.traders.assort.assorts.barter_scheme[bc];
        }

        for (const level in mydb.traders.assort.assorts.loyal_level_items) {
            db.traders[mydb.traders.assort.traderId].assort.loyal_level_items[level] = mydb.traders.assort.assorts.loyal_level_items[level];
        }
    }
}

module.exports = { mod: new Mod() }