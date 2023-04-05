const { TelegramClient, Api } = require('telegram');
const { sleep } = require('telegram/Helpers');
const { StringSession } = require('telegram/sessions');

class TelegramService {
  constructor() {
    this.userIds = ['yaraboyz', 'nodejsfinancebot'];
    this.telegram;
    this.telegramSessions = [
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.2',
        app_version: '8.9.1 (23989) ',
        device_model: 'iPhone 12',
        tg_id: '5633198490',
        phone: '6281389284991',
        username: 'oqywiwa5',
        last_time: '1674150350',
        password: 'oqywiwa5_5633198490',
        key: '1BVtsOIYBu5WsVXCRf4LqT1l81VhyH4j_pplvHED_D1X2N-787jupln_u_Txtk3xGS8hAZAFalr6gcemAtEjqlFU3Lc6iiL1B1WTf8BGzTh3tYDZNpRxAQ38J8gaFVAaJWbLz1zt2ARgbEV9NOtjFKtcC2CAPduqgzJ-7IwM27uBfgSBf7PrFSwuzTNJcHa-twSstOPaZkVzj35Jklb8Q6Kk6fZYXXWulQPuhFEq45LcCRv_QcUZa2o6UlcG1IjrJ4wIzyREqxhGDJEYKJDY2H092rM2-WlYYMzmkbRXWvJ_F4xeFUhgQYyfkAh9MOFFuEy3WIef0QI0i4_x7usrXorHWY0sFcCQ=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3',
        app_version: '9.0.2 (24217) ',
        device_model: 'iPhone 12',
        tg_id: '5890025963',
        phone: '6281389285301',
        username: 'ozhaxodo7',
        last_time: '1674150350',
        password: 'ozhaxodo7_5890025963',
        key: '1BVtsOIYBu6N9PhtSOwX26MCn42fEzVT0TV3G57QUBmFwED5m1Ej4ozkVFj1IPknhUT2Z4FLOINCUnyFtDOWhfMX9r5pO0yGXKlfPAzUGSdN_Ay0o9kolBTYFNPERlv97cyt0ABPQ5z6e4fDKQOHl5jpbdhBuYRoKskfSfNv_o2KrktEgvVo90rqnZINoarIQgTFbBbAJ6VTTQMi8XgfhQlIMFeMRj2b44Ar1EI3ztBdGFzWnMxBv1Y13ssUHZ9NNdtS-KedQiEnLL7wSdjhUfYQbvonIa8XQRJQQxcjK67JtCkZKGaIbOd7lpUP574sb0xN58jkmgM1Js1ne4XSWs84PvxJxlbM=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone 11 Pro',
        tg_id: '5907835805',
        phone: '6281389285304',
        username: 'uchirani8',
        last_time: '1674150350',
        password: 'uchirani8_5907835805',
        key: '1BVtsOIYBu3Mp99-KSp09DI-tQpJwmgYWtOhwK-DuIvyCcq83EZgPI2o7sh4LUtPzdQTKwQdZtOg6TpA0OXny24oKCLdH5X26HiHTB2UyqRHPzBZPBJ8YhoxitUz0fy31sKLoXRth-4klS4WmG4wVXDqLWJMeYo4u2qo71EF165bOrHYWyaE-i59wjMXJcvHaaLVNchuUQewnOYkBLk0LSK7TWcPuaLUZsTIrDwVktZ4y3CL7MKGwxYcF9xu6507J1QMMzNFCWT5XENhmCd8_uPTmgEyFrJTXzYUjUKHqcBzFrexSNrs-DRXK1pZdFUoewCftVYmgTKrafHW4Tf2hKu-Oz8FSbFQ=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone 12 Pro Max',
        tg_id: '5691040057',
        phone: '6281389285246',
        username: 'izyvipe1',
        last_time: '1674150350',
        password: 'izyvipe1_5691040057',
        key: '1BVtsOIYBu1TTc70L4HHMuON1EHUqRy5pHIQEivtZ2wF-rGKCp5pShkMDBrBmSlSdGOTnT5EjHZhnBxlCAbN7VfLuts00LXlvJyfl6HinoRRl0D5fqgycHWHpEbX0UoeuVM5pdpanAA7mRlOZfZ1kvHWwtCULCDAUT5Y0_zaXMhcqwMB3-HUZJrgXwqdBo_4mp_uAHEczm1Tft53aHukayr8EpCzByjqQHMaKMo7PSQmxU-yGt6Z_BM2xJda9IZ-FQTwjIbWbQwl4yA9kliVhA9xC5Y0ii3-aoqYQkUwnaOYU4EEIqYWE3vc46Lr3gFD1RldY1Q3bFGCds3fCvyyqIb8zpJ-SewE=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '9.0.1 (24209) ',
        device_model: 'iPhone 12 Pro',
        tg_id: '5768732135',
        phone: '6281389283889',
        username: 'xoshoxemoh6',
        last_time: '1674150350',
        password: 'xoshoxemoh6_5768732135',
        key: '1BVtsOIYBu476gcqz_CkmUjazaL5FS-D-kqK5ANBUqZgLUNDMWUWuXXaIBHnU15Xmviw_8WjPCSGjE1NMm3CWf-bh_ixfGgY-n9gZuu5NCy0FPDBq4GKZ4wRfaWb4kYvyIdCjDEcLWmTjfWgaIdYaRru49rANQgsIKa26LHzLkjeNgzRDRgoG3uT_s54tvJnDg8T2qs07j9sNMOsX5oVFcuvfwVHbBkkgdvrV-8Q0NVG_dtInjxuWMQzLNp-zrAuCe4cj-AjnCB0qfOt1A_Y7l1a9eSVQizKg1rgJJm5JHOXdIAUXRFfsFqcrfMVm-yQGtgWWgCEwwBVrm7YRc8JaKRxo2iov_Lc=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.3',
        app_version: '8.9.1 (23989) ',
        device_model: 'iPhone 11',
        tg_id: '5554895924',
        phone: '6281292021842',
        username: 'chatuchaqi4',
        last_time: '1674150350',
        password: 'chatuchaqi4_5554895924',
        key: '1BVtsOIYBu4CwZ4FYrgFtXIeDJvLD_O6zTW5Z1VD6FJOsI6Usb2XYryWTRveMb3YgyR9laMIc-9fr6rnQGVeN4WZ8jctSCcPC6p-elrgDvNbN6JzgMdkuKSq2c2MinEcqbIxvHg4BlFhbX1c-5vPnLdDG9Cj47UQvXgwVY5xoM65I9sEzIfMBdhaLF2hTfkas-2Ha-9Y4jyB8h4bQEq2Gi1vuuoLOhlSiudhfWyESSqmNe4gs0qvPsXOfzS17XucK4qmr0USeM4aN90xYDIcAto2b7Kw1jcyKB8A7FaK_Tcl6Ds3ExCvyct6ufdgAd7VSCv3ixZVh8zqvVh5j9blqjVgiQSR4z3c=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '9.0.2 (24217) ',
        device_model: 'iPhone 11 Pro Max',
        tg_id: '5828016432',
        phone: '6281389284631',
        username: 'thogodyt1',
        last_time: '1674150350',
        password: 'thogodyt1_5828016432',
        key: '1BVtsOIYBu5C2z7aFwo7FBKhCfoFyLUjt3By8Ok2sPoJxpSvczZQUBiSJ3ZbYg_BZ0ffGmryZqRzUmEtHlxO7SfjsptjgbaN7rYxHeJNNJil_ceiYmYcjKEbuyt1_oXbLk7s3LjpGS-uJmkR4j1pE0AFI8d2Hjq61vhwGevrwvJ9DZIUk15rYnpaNAc0jJOj8CfjhW5JWnFh-zHg0aIcmvaRcI5Q1JTp9eoqPT-EbRSMZEzyx6-b--l1yM7TbMYhhp_5m1m9xFWPOzcAynyMGRCZSVevYwl0vYU134H1dsSP64iOZqlaFD_-kaKMoQdeyyT0axXQgBgCCwZtEJHPCNRlTf-aY38A=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '8.9.1 (23989) ',
        device_model: 'iPhone 12 Pro',
        tg_id: '5951184723',
        phone: '6281389285089',
        username: 'acenykhu6',
        last_time: '1674150350',
        password: 'acenykhu6_5951184723',
        key: '1BVtsOIYBuxnBw7zhlJpyj-7DoRst12I05FMIiDu7WsV94wD7BKFtmz5L5bUNbsljcfhQEJeYg-ZYloFfd3C6-hMks7hEuCqdkuJpilwiNt9vZoVAl6MH1zbXEaCTBudqg_Qzp-07cdtWnz-u4wO9ylW6zoPHH2RrqI_lPQZBLxCrmBGzkKEfUNBZNaAtUpFWlyO1Mdb3ViQxF6818UyimF8uc0O7o3WltqIY02OFyH1l-btRkxwvz0YHHpeIUqP2Rv3kc6S2ae8cbgGDJHUeoIiJAoMfBrJsDw0nlizPWbMX28komh9xUeQ5rOBsBtBguuG_6W95-LZgKBRjNsE2l08r_2kks9M=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.2',
        app_version: '8.9.1 (23989) ',
        device_model: 'iPhone 12 Pro',
        tg_id: '5941148505',
        phone: '6282127213137',
        username: 'zusikhiv5',
        last_time: '1674150350',
        password: 'zusikhiv5_5941148505',
        key: '1BVtsOIYBu3Ik4jG2U2BwSx5okA03EGqtY4_ic7Etn29QNyszHSUPQqAry0t4fVIRu18EC-EcDrhrc-s70ArWOJtsjciS9QZq3319IsKnPP713S0oWCVEYpzOwy-Astd9S3tjoYxYUzf4WXsGcfWWuzOsNMd9VXL8991gHPAGYv2EGBPnVAgHJdkOMlQrEGAFvafj57gUgDshxvnWX4o5w5y7SmVGvWU3SrDLcCl3suHBoR5KDfh3_0kkkEFoK3as8CPVyRC7Bs8zzmQ6H-4Nq761H-5kT0KMXuZ52ZI4y0L3uE4wc3OXRLmwxllHfj2dw0Df21rXpYQHMoGNqSB9EHu_Iokzh6U=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0',
        app_version: '9.0.1 (24209) ',
        device_model: 'iPhone 13 Pro Max',
        tg_id: '5849273596',
        phone: '6282136464352',
        username: 'efokutho2',
        last_time: '1674150350',
        password: 'efokutho2_5849273596',
        key: '1BVtsOIYBu5hrborbPdhdZy0gB-wja2y5qKXXo5dMDlwgf5Xd8vH89kUmAXrYCv56GGhyWClNvBffWTxXonyZuS_ZqtShIg-980IzDk_I_wt7A2K3MwIgz6tT4NfUlRuo7RQfEm9jfKPuRy6piPu_mc5e3yb6CZMxc4pR_zjPYx6kYyXflxzmfHkmWEQrW34sZ8fvHvyOzj4rffouKXWewdYHF0vjhqhQ8l8f5wXX-XGgks95b9_xkX1jl-VQ0rho3wxh7dYwapJqTxZVsBj9UYGFjrda_Cylb15nNzmN58kDOXKhyD0iqZSe7IUY7fyYSG-UMyBV7XkMab6zOrWVuzvLqshFm-Y=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.2',
        app_version: '9.0.1 (24209) ',
        device_model: 'iPhone 12',
        tg_id: '5811205933',
        phone: '6281389284740',
        username: 'ivubyca6',
        last_time: '1674150350',
        password: 'ivubyca6_5811205933',
        key: '1BVtsOIYBu4vpjzRZXUT4VQfbOB2hxmkOXfVKEIYCYcevz5JQX9CGkJvIBdDfdgDx0HXhzOcazcGwNtMBMrz1vNumHpKqh0IML8YPX9mgXK2dPxwD7-6yh84zhjDc4xgh2JUfpVXymefuAduYSQON7ESHpIrkp9ep5oaz5DryHoZqZMMiE4GwlTzCicypst59javha6uuDNpKBHTSaTwVDlFTbgsjN63zjKOHTdMSKLQ7oByTrJt3OumNxB5f9l5qxdhwRp_i5DC5UIxjI6lG9d4-yY4H81VZODgP_pMx6rEDcsSkKBySW98SAYIcs6Vs5IaHlmc6zYODqk11bKDbink-Qu1FdWI=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone 13 Pro',
        tg_id: '5942628374',
        phone: '6281389284727',
        username: 'xijiditoqi6',
        last_time: '1674150350',
        password: 'xijiditoqi6_5942628374',
        key: '1BVtsOIYBuy6COBOnZZRr58zd3vFxEgZLtwXpNCX0kHU4dCMz4CbtcOP1xTkhswm4gEy8d8EzF0SoMPBU7A5Lm5bvhP9IWtx0heXSSJuJGrOqs0jpJSI-LEyWcrkSqHB0dg9jt8UVRoIQ-Dq6IVRO8x_G8bZws2Qt4B1H-kCyngLBmeuI3KJylpjezhmoiUuRqxBufGRE83y_trH3ajwPEzFZ3hDI1Ifyu_dTSS-a0zJNRaZuJWASn9WAAbOj9Rs_D2SPDjqa5cgLcCAEmp3GObWUat26aAOxkqIZ3n_jDulUu0Jb_HFOp1lCLkL0aPONL9HBEHFVDRA3-Hyl6z1xoDXPIe9i4PY=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3',
        app_version: '8.9.1 (23989) ',
        device_model: 'iPhone 13',
        tg_id: '5933818453',
        phone: '6281389284704',
        username: 'shazyvysh6',
        last_time: '1674150350',
        password: 'shazyvysh6_5933818453',
        key: '1BVtsOIYBuzgQHZbv3uXx-_MxoiCrHOKzBGT5KxgMdtbZdisIYifhsHgsmavxwPN5WJgttf9fjkc2tbx9wqSuAZwO00JICVgoW1kpiglMKJ5jgVHtYq_UsN0KEkwGoO8imRZVAus_bSn4GZvn-nz9NR27sz2NU8is5ugYaiZN4t2pRwikpn7g6SyWAm4uOX_XvTeuNV82GvL7GzYQrtBC8CynbK6I5MURAJzoTxAjE4PVkOa43iG2zx8UsXaFs-U1F35mMYjCf5m6eOoa8SoTtreCVuWnDha0nxsrpjsQyxc71tYrAArpfyCaAoYlRQsXBEA0WzKm3w2M9yH-ZAT4TkxTXxgnVqU=',
      },
    ];
    this.currentSession;
  }

  async createChat(title) {
    const telegram = await this.initTelegram();
    const me = await telegram.getMe();
    const result = await telegram.invoke(
      new Api.messages.CreateChat({
        title: title || 'Новый чат',
        users: this.userIds,
      })
    );
    const chat = result.chats[0];
    for (const admin of this.userIds) {
      await telegram.invoke(
        new Api.messages.EditChatAdmin({
          chatId: chat.id,
          userId: admin,
          isAdmin: true,
        })
      );
    }
    const res = await telegram.invoke(
      new Api.messages.ExportChatInvite({
        peer: chat.id,
        requestNeeded: false,
        title: 'Инвайт ссылка',
      })
    );
    await telegram.invoke(
      new Api.messages.DeleteChatUser({
        chatId: chat.id,
        userId: me,
        revokeHistory: true,
      })
    );
    return { link: res.link, chatId: -Number(chat.id.value) };
  }

  async initTelegram() {
    if (!this.telegram) {
      this.currentSession = this.telegramSessions.pop();
      const stringSession = new StringSession(this.currentSession.key);
      this.telegram = new TelegramClient(
        stringSession,
        Number(this.currentSession.api_id),
        this.currentSession.api_hash
      );
      await this.telegram.connect();
      await this.telegram.invoke(
        new Api.account.UpdateProfile({
          firstName: 'Group',
          lastName: 'Maker',
          about: 'Group Maker',
        })
      );
    }
    return this.telegram;
  }

  async disconnect() {
    if (this.telegram) {
      await this.telegram.disconnect();
      await this.telegram.destroy();
      this.telegram = undefined;
    }
  }
}

module.exports = new TelegramService();
