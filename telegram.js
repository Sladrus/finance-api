const { TelegramClient, Api } = require('telegram');
const { sleep } = require('telegram/Helpers');
const { computeCheck } = require('telegram/Password');
const { StringSession } = require('telegram/sessions');
const ApiError = require('./exceptions/api-error');

class TelegramService {
  constructor() {
    // this.userIds = ['yaraboyz', 'gohardpls'];
    this.telegram = [{}, {}, {}, {}, {}];
    this.telegramSessions = [
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3',
        app_version: '8.9.1 (23989) ',
        device_model: 'iPhone 11 Pro Max',
        tg_id: '5893901814',
        phone: '6281389284767',
        username: 'ycumanathu6',
        last_time: '1674150350',
        password: 'ycumanathu6_5893901814',
        key: '1BVtsOIYBuzOU--BboduwJVSsgJCvzJNfmArwh1q1LWm6tsa2OW5lxUnipshFgK15apapKzF4XTxXUvN53nEubZHqGe_qQQOohk4fybObfF9HlDl-H6vffhWZiYoHmX-vXp1qMcOjc3VCesDH09UsKo6eNaIssIqONE8Ub0rOBo3AX3h2ciV1MOmZZ29x8JUcbvANe--Orq5L7E4p2JikfnCcLPHfXjod80nnF9N0KNKMhznuepOXvD3X3rK0ZQT1k18Xu2xURPGj4KtsUqj8pVE7QCvlDtg3ou__E4wPQNa93QgU1fIjCcMNYDGTUyiwJxBIPjyCyaiTaTx_uaslMI3K_KZ9U4U=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.3',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone XS Max',
        tg_id: '5517655040',
        phone: '6281389284732',
        username: 'bewufuqushy8',
        last_time: '1674150350',
        password: 'bewufuqushy8_5517655040',
        key: '1BVtsOIYBu3NxKDXR2MmXX0V9nf-y1Pjq_YPPSrrqC5YtgWPRuxGq4-n3Fw4zgG-1nGqM4fEduMX8682v5NRdjdpDXmjc6YmCi8rHeeBPOtHRvsHOVgeonW55Vo0jlY0HKx_7lMwh6YmfiBBRIqudi9Yw0LGHNdHSs_0X9dY539AV2ooLmDgvrd93dTvHRrN3eSbY8cHqz53CZt_GE1VLvf_LuRYARgD27sFCRNeJz-4czZNcV6FkjmSUxTyeJZld68D68XUqm8q166vlFhQXcTt1_F65nk9XQkPB4si0cWQpgQm6QIhczFYpOdhnfcAiD9fIsc6iRMdrh7Eh3_lO03Lw08oizvE=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone XS Max',
        tg_id: '5673156772',
        phone: '6281254816561',
        username: 'ikhytakyjiq1',
        last_time: '1674150350',
        password: 'ikhytakyjiq1_5673156772',
        key: '1BVtsOIYBuzLRwkbIcaPVlzEDXHdHWNIPbKb3Psk7hPERC2i5yyct83d7MjlH5j4RV5DwKT7opOgBWD1pwdzNPvoxv5Owgt2dlga1_c5Lbkqv4JP-4boVUFj12E9N--50287BtcdXCIXPJM4MEz8lwyS4cuk9wDsjW0ESajh19keuBsDgQxR2C3nLs6a6iwMoCgOpEEwPO_e8xwIYO8sA8kf0sl3hzJKzhFPuzVr0xb1Z3J6moKbaVZGElVxctecppBJ4YelUlUklSiUlFN5wCFfkxMeL-zPbGWzdSYWhUFj8i1ge1FvYpqAPunRKCND2kNkJyWEv-HlTSP-krfLlw98e5BkZwnc=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.3',
        app_version: '8.9.1 (23989) ',
        device_model: 'iPhone X',
        tg_id: '5956477453',
        phone: '6281267493928',
        username: 'mavyzhachoma7',
        last_time: '1674150350',
        password: 'mavyzhachoma7_5956477453',
        key: '1BVtsOIYBu5EOjVjKtdJtAWSQFwH6YWQU7Yf0VOWTfVFIN0PlnJT5FujfNAUvz2lmbG9lJ22SuSHco3e_jbb5zFkvd68oDKWWmeYyVo1_-8lUu3Vo2NuXXpa51inXPUuPw_cTdTlv2256yDdVyal3psINMa1zJmvNkPVjf-XV0PUuMUr6R0z5ONxlifoQQp0rJEyq6A21a5XgX1LldOmA6AKZTDE8L8gROX35MjD-kGFBmORJhPTPEEnVkmrAJVpV7cHxx75EJRJTsZi3yh00stvp-3YS9lrU4uPFuWA_6xvEVMES_57SfcBXRLqt_KKoCLgggN2GTSQv7Gm0pSf7p0IAlE4cHW0=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.3',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone 12 Pro',
        tg_id: '5884307486',
        phone: '6281267493870',
        username: 'ichojichapy4',
        last_time: '1674150350',
        password: 'ichojichapy4_5884307486',
        key: '1BVtsOIYBu4079siGj3r6MLQ6hQ7dh4ybicC-cA3G6llmZymRPqK8eGApOD-umUdWgUKnRpne0EG1q2TjzO1fY4pciKF54J8yO8oALWw9I7VNMDtKImL71bcmuCBS_7Ibll2azKP8koZwWjldsbdKEdINIja7UDNi2H7kskdSYvc-Gjdeh0Da4h3CuIi3s6Z1FvuuDjm9pcbbYzEH7IVPYnF0jF4GXhJQb0PZJlzGvom3Jaa5NqsoWsmkBK7YfflF0ULYVtXL7iCm79ewJp4Z7qlJCYZcdMaOIMfs-c5Ot9jia7ml5BspXVgpB6HxMZdIhTs-rhCJ9cM70eKaJVMM40RetaH7WuM=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone XS',
        tg_id: '5910649903',
        phone: '62895327513464',
        username: 'vipucheth6',
        last_time: '1674150350',
        password: 'vipucheth6_5910649903',
        key: '1BVtsOIYBu3AtjpBIauImAZRQnp7wlHO2Z9snNK6WW13tkDNuHb0AJEZQoQ-UI3K29VD1LWQ9G6ggS4rhpvXFllVU6CWBJLpxib2O7Naa7O80TotSjhf_zYL_HhwZq3p9sOmAddgIRQpxRAVDGOQM7aHHj0g6WiQTsKcJZQPFII9fPjw1DVc5mANns67z08fdNTapx5K9b20850M_nVXlLuYnV5l5MOIGzQUqOFe59OO-6JfregVtHtl3wlikTvjv1ntcQll3w0UNCuLlAlxurfyQx0XPzrV5QFSpdGT8BKPUohOKjBal6KU_IgWZ16kkbK7pxVE6bnVLr_QCxeWRrrwYpTGuwpQ=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.2',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone 11',
        tg_id: '5615234867',
        phone: '6281389284728',
        username: 'ishachekychys8',
        last_time: '1674150350',
        password: 'ishachekychys8_5615234867',
        key: '1BVtsOIYBu0EWyrnOWMYp-7KobV0DDNIOXsK5NsM4XPJdIZ6FRDgcTW_u9GPc9o-1zoLcUpKfwY7vLlVTOzZrdJ7xyWFawbty9gOL9SlJ_NS1_JQ9M9gTUaTfkiTQCNW1WBbCdBcMjAiD-3YzGffV6sGVMtdbgnpUpFq2yYi4pFGVlS8QwEgYPb6I-2O72UTzcKS589dJhaI4X6UrhVGBYUrKWllrSgWyded52xY-HYc1QqXzwAwbz-CObDW8czXQ9ijASAsnfvRQj2Aoeir8ej9aWbItXBXLz26_jCr1akVqg4O5Q0k-vn-1nLj2IG5x3v3TbjcFuzap41B1nvUdPhJU9er4tfQ=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3',
        app_version: '9.0.2 (24217) ',
        device_model: 'iPhone 12 Pro Max',
        tg_id: '5886533102',
        phone: '6281254816564',
        username: 'awosojelo3',
        last_time: '1674150350',
        password: 'awosojelo3_5886533102',
        key: '1BVtsOIYBu8M0WOXMAB2AvU5hADybrY8AEVzX7joj89JAMaHzXqJVGnXOe16m4YxN6zXwYvhoOFhwN6e4ImGaixZH4iP-N3MfwFrHOfubF2qJEEkZM5cZSxuA_VgfZQWCTRKeGJGcptsZu0owqqU6QoLM-t5sQ7hQXIPvx1NLAnd-UkmldquPJNSdDrZmPmd62ga0m4PAFvWme5qPtUtbY4k9h6JvAbyFpFL_gI8hDmLcN9N3eemVbmekkxk_tRkTbV3sE8M2WXzI0yDjC6M6Wo1PgPB3JF1w0rRa4M_CAQfvAA7Ex4-UlVrVwGScd0ve2jbeQdwkgLIGIDLCG-5aJssdZ9vzECI=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.2',
        app_version: '8.9.1 (23989) ',
        device_model: 'iPhone 12',
        tg_id: '5604076326',
        phone: '62895327513720',
        username: 'chapapase8',
        last_time: '1674150350',
        password: 'chapapase8_5604076326',
        key: '1BVtsOIYBu4PJIJFJkv7Fb4VIBi8w2-hQkLbb3dSGBXNBGNuDN-q4JuZa8gDlREi1Me7uLufde1ot-vCXEogdUGnhn_tU5juFyXTxOc_-2BQ5s3atYpgUjDU8GfZKgdbj9gBrT4e-1_UzdqDTxtpUegK_LHFC1GOAiS7oW-IqIAwIcAlIk2QjPT56i0cJhvfdBGT8hEE5QTBfninlmiZ-__BactFCfGYIOHJH8x2d-4UWZ5pt3zTYMILCpWwFJF_-xapj8BsO6j2pTPu1OD3gtEYS5fPKv8ANwJnRMC2llj0FO-Xb5uXBqmQYeV76jcG2SUmNUSSQ4sHST-phITpvp-FbkbcaRiU=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone XS Max',
        tg_id: '5869893864',
        phone: '6281357136072',
        username: 'uquzideg4',
        last_time: '1674150350',
        password: 'uquzideg4_5869893864',
        key: '1BVtsOIYBu1Vy88ysadnx7McEVyhEShfrbkcR4SI5R1YJeMJW9tnoYgNg7TGyUi0GQQ923VeA5vILW9TmZpITQR9WMq9CPQU61HT0fI_L46b-PHNx9Hmj9ZkxWeg9S-kkVCc4LTy4byUW8RTWMdFe9dH7Rwx6mFpFNx5hlFaYjoN5mMLKo7sPozV0ujGkWW8Ihf1c7Cg6j9bvf2DeovIJsX6tNwHdG4tBo7AbZvw0seXXP67589ehNF-dkZ8-TJp9SCqBh1BLZKHieNBRZ8GKvDQ3vjZxMna-TWeVLKl7CT4iSnkgAYF8XEHajgRcmo07Gi0n84DuAp_u1RJa3T585ndSPVE6uIE=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.2',
        app_version: '9.0.1 (24209) ',
        device_model: 'iPhone X',
        tg_id: '5903434634',
        phone: '6281357136070',
        username: 'ofewuwap5',
        last_time: '1674150350',
        password: 'ofewuwap5_5903434634',
        key: '1BVtsOIYBuwSEuhqBbCMtdYmedE6x-1Cfvtd0qoeX_76x9CsLfu0exk0ME_-FiSw6Y7gOHbsohB-17v8kGT-3sCfbbO3KdEkXAWDE3s0IBU9-W6hYLkfBWo3qo4IVRUOlFtu5P7TRAan9m-8GcNNhPLYH1awxxokMrL_EnljIhip6OAzbH1kROQg90AQ0ufIlLyugQoIn0ItYaCvrunXrSrzpS82m17TAnVP40mnI3OmCwOg-KvuO5cVnGuBd3rYsx_6JawDwhYMIdyWyi7OiO1dFrKaHWDemoRnN5rW0Ms1UV5Am7_A8f_kLkURHV3D1uUSnqH3IFxNN2PYwNh6cohsyUNjKhxE=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone 12 Pro Max',
        tg_id: '5895315288',
        phone: '6281298141474',
        username: 'ulabutel7',
        last_time: '1674150350',
        password: 'ulabutel7_5895315288',
        key: '1BVtsOIYBu6N8ZS3nGdBpEp_oU7y679fz6llbb7zuZlUXvFZu0lENo8FlPEBIubyQ66wTL2cTyHo6w3xLg77OicpmTCTnzIZEnztU78byf-Dk2-UgC1z1VY8XwC1OUhIAlYaCJVYopprbxEbB9OjAtVUY8ILk49vRE6A8qH2cKBSxms8ntbjQgUQgbMpM3U_9XXJW_ViA-s8wv0Ks3FHgQzYIlrBYlyfmNOVlB0ag0HJaYJZio1o3JCMN7dGz2v2GuQXYamEqCKDvNgv2PqDdE9DP67KDKqu_hfjPdeSm96l_lXa3qSpEvnII5e6Z2BExFMuevIaby5OrFtjZHhgECcTaeu6tacU=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.2',
        app_version: '8.9.1 (23989) ',
        device_model: 'iPhone 12 Pro',
        tg_id: '5842491267',
        phone: '6281298141558',
        username: 'ixyxykhusov9',
        last_time: '1674150350',
        password: 'ixyxykhusov9_5842491267',
        key: '1BVtsOIYBuzMW7heNStgai0WoXg8AIUDmqxpYSZkv-7JpPcOoZtkE6h63X9p09rzq4rj1DPxrklOK0yUYTn5eOrV2pdSz5i0NulkN8G_-8ez_1OxYOEsBaB155ZQOyf7hBhkH_paPTTmrOCStB51TVVj8y1jjsakwQbfsm3aY3gGHbvOfmqiwxvQymuhyGg-RZD6MFIFGj2Ij9gnZp7sSuuQeRWRc8Vy2NJztLqD8eY9iVb9xEk-Hd5MDMohUkoTWYoqwB_zhU3G9cfKikrCNRa4d-gh6Gm5XmMpXSsRuxNj-wvAqGqB9SvwsU1HxKlBWBWLhvxs6YtMgQiyjpsXq2wvSsKDhOJc=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.3',
        app_version: '9.0.2 (24217) ',
        device_model: 'iPhone XS',
        tg_id: '5540002303',
        phone: '6281389285316',
        username: 'agenafyg2',
        last_time: '1674150350',
        password: 'agenafyg2_5540002303',
        key: '1BVtsOIYBuz4E8Z_4Y-vj5uMJQovs-3Zlp6sCIJptqAjocHSCrKCbSVI8smVKe2a_0bSBgMA1Ja9sAHR3bHwq9KTc8C5rQE_i4mYu2XTm0QllcGk525OEfI_S_i_-An3UmPcJmlB0Ee3tJX6dTI7_-mUcakOFPPFg1dtK5wRBQbJdgt54azzEluWL2YysK2aaL1PobhHbrvOm8x5rMDJmI_pYyzj5-blSd_HY6egcRGfK0Wzk-YGMqE5h3V04G30Bo54G3HXXqVgT82zK2J2QUQYwXtinNilvU8TP-mW3qyMuPLE9YltwnynIHcdiOQR7UdZI3lpJtLNhR6t9ZAZ9ytLh3uYjWF0=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0',
        app_version: '9.0.1 (24209) ',
        device_model: 'iPhone X',
        tg_id: '5836593374',
        phone: '6281389284743',
        username: 'uhirefi8',
        last_time: '1674150350',
        password: 'uhirefi8_5836593374',
        key: '1BVtsOIYBu7-8EtNGqWKg9NEaUXzBG_FGEnIJGVWA6XruefMCp1S-jKAHzrha3mvdQ6fqtCeodx0IfRw4SGKrcmj65er-b9qRVAoBUIW_FGvEg5u8bxEv2E2ts_M2CVeRHewIgzJhMZSgZsV0ukHXLiKg-RwRE11Du08UjJS19Kq_qK2Zuq1cLV1zssIv6hnBhPgAPKiLH7pdlJp5D86bUlsohB2tQsoZym5B0V4rgn7cej_tK3BA42eCfRtnVzYLe5etnUnueQhn_deE_q5GrcAp5BZMSWbRpk5m5iEendc3EonvTTWFn8PNvgHooe9IKsRJfr7n1uYn5-8El-PxaWU_Tx43f50=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.3',
        app_version: '9.0.2 (24217) ',
        device_model: 'iPhone 11',
        tg_id: '5870782728',
        phone: '6281298141589',
        username: 'ukhyryshemob4',
        last_time: '1674150350',
        password: 'ukhyryshemob4_5870782728',
        key: '1BVtsOIYBuzSEFD344lIHiax0wTqSOOQTKcLYe2vD0Yth64AhVXLMKvGnXK5RirvHF4l5DEhvB__GCOTvGEkqGLDSbd39ophJ7-aAlL9LlR5m87voiIcq0spYZY13LAzg9NKn-SuaPMCZ-Tkle8N9XtfL__9efX_IGfcUs-BlhSbhPFD92hS8e4nNTk6YSbvEKRWccNoszBbmL3qdXSXWdxTIOPnVY0SUVR3q54NNq-gRcQ-CIK0TEn5zywJ1DWm-XipkKhIo2TQ444y0qV6XfQd4WgY6Sid9W768u4IdpYTGHWGDSPUR-e8H9ZbaQ6YEjFUNBv5_asta2opQXecjaWJisrN1tJo=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone 13 Pro Max',
        tg_id: '5866447626',
        phone: '6281389285248',
        username: 'bymofili7',
        last_time: '1674150350',
        password: 'bymofili7_5866447626',
        key: '1BVtsOIYBuyQt9fM6dRxE9D5zeWL9nTcyrlJVZHKV6dOdy6dMFKdmjEwgsHz3XuEgAucDj--NTGID0q8UnX55GUOC3HmL2dptis3S57T28lBM_rfTR_na7EKKva_NGlZJXDBuiwe8QQZQdpY5VdrdMa6LOUmJ0kM8i5bzYPWpZ05IgHH1y8-1sTUH42pS9CTFHHRdUBg2isDGbl7rBDBUmIeeQ_iqM3Mx4bW1VOZ69mQdlLvpFxW9J-BKzGJmH_XZCqfXAfgE0cc02jc52isJrK944QjK8WNt7ao-Mut32jD_7TXySCOWe1Be10jd9DhlehoLVvbPi5uxQnZ7O5LsjvSs-8vrhSA=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '9.0.2 (24217) ',
        device_model: 'iPhone 11 Pro',
        tg_id: '5838873033',
        phone: '6281389285250',
        username: 'zipycach10',
        last_time: '1674150350',
        password: 'zipycach10_5838873033',
        key: '1BVtsOIYBuxIayqZduGTMUAug3Ql0sfJ-M38ZolQGnQPT9OACglNNcQbaedEzJblauB_b7zA4sJphJMLUA09Q2uzRL6l1i83551Fjwfpwz6fW5z8VVW7353hSCwdgzKz3nR82Jy1Ne4f_yhgd4SEsBBGhnGKdLZ0mzeE0JFJAk_ETih-L_HhBRPJp3MlZLEZ3WAkXe4JnpBT02JPp_xTg1I-zlFl4pZoZqJo2vLY4kjTIlfbegBJ6c-9WR3BZjPt0TQfBlzIc97PdwgaDIubBQuddUL39305aiFxrHTZdMusecz1SVN9S14Tvmh68UsJg7Fo33NFIGTidiIZgSXFvxVAv-Q0fIlY=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '9.0.1 (24209) ',
        device_model: 'iPhone 13 Pro Max',
        tg_id: '5724988075',
        phone: '6281389284609',
        username: 'kuxajure2',
        last_time: '1674150350',
        password: 'kuxajure2_5724988075',
        key: '1BVtsOIYBu7xBt6tcGqtSqPKxC0uVwb6BS2I33VRJCgVjL_d-if5ywGwI1GCxC9sTaCjgxugtLpGehgv3FYOB8mW_iy83MBo1DVA-BW7b4w2m8uHAU_bblFOHSzWPy7cKi-na-FcfxhorOTkSFC83U2yJYlHwoWLVenAMDAWhEQItYM4mR7oLHLpdXKdiBM8Hq8oP35axo0CBCvymcyBEdGJ3Sd25hiB9925ZPRn3nLWIWIiY2aFhzExg4o27uO7jY_jBA1L6jrnH4RYNFuj0mqnSOGM3d3qBRd59lg7rwKh1jCVuJhyuofdjGARBdQKYq3LnVJACY052nghgAT91cCaYTVyjutM=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.3',
        app_version: '9.0.1 (24209) ',
        device_model: 'iPhone 13 Pro Max',
        tg_id: '5634005736',
        phone: '6281353029354',
        username: 'enuzakotur1',
        last_time: '1674150350',
        password: 'enuzakotur1_5634005736',
        key: '1BVtsOIYBu6jVLpuCe0WoBgZagmhjAPVo4bi4Jie4Bc-ptUAHxdlxkzUrIeqOFqw1I49fa2SsTVnlseh6gVWLkAZHCttQSHlfDwrmEqdur8jlKxv-67gscigESSy0NjrogAVI4WKxTSd_lE-Zc_m7HWxyipLMfdQg8BiDf8Ndg1suC1CS2H6hRcRL4ndM8emJxfHErJdYMsaSYmCUSknj1EvndkCytqzC8pgsazyd1qCRzg27b1B7PSw5sM3Ci8ZkBxPl7788bEOVzwseKnznT1S4VyO0CbtQIX3FLMT9wnQO49TgXWpPqn90RvvpeOe5gY4M2f0i3YchN0mK4UjaBY94EE6W-lg=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.2',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone 12 Pro',
        tg_id: '5848421297',
        phone: '6281389285079',
        username: 'fapoluz8',
        last_time: '1674150350',
        password: 'fapoluz8_5848421297',
        key: '1BVtsOIYBuy0GpuIEpoCcp0Jh_E_ycQSa0QDL6IVRRkIn8p55QcszM3IV0Xr0dFWE_fGcdV7omnD-VkHA5mqoLL15B5C4Y2G-YTlJm6bO1VHyS-pQR2uHzDVL0qeNpyZsAEDwPs1ibXD6u1CWeW4LcES_zzEJwhqaIVQrax2Q5GBh8HH2HxXI8atZk3h72egBlDHBNl0NV0jT-LoE-nJZTLSBmQYBEuKQa0-kQqhPOO-DI8FxOK1_k-rvmec0gnomACo2b7flTEUAksVDTUB3FGHEGnyEsFP072PyksauVmlDEGLsGDPvsVH2FeKKRXdYTfdnEbFSpQXd9EHhQATMcMEowIiil8c=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0',
        app_version: '9.1.0 (24428) ',
        device_model: 'iPhone 13',
        tg_id: '5940912075',
        phone: '6281389285009',
        username: 'rokathad3',
        last_time: '1674150350',
        password: 'rokathad3_5940912075',
        key: '1BVtsOIYBu7KvmKLVUFO0flvReogsONaiVL8LZZMXzvcDh_ESYvjgfVljibQ1Ne9wV_fA9bYm_TlXpDuS-dCEXyqT08aZ5mRkN8vJ62orTKq_1lR2cafV-PbFE3WoSar3gmvz9pVz9bNFBMJFcV22mDCdWQUU_1ad5LqQz5nqhlRGFhTpjbk9LfEI9UEdQh6t_NwqCK65WD5-zMDYDZHNPGLOB0E59G919KmD_YfsbG1X_uDG2UPyj8gtPRRcryGhMR6UzSAGdUYa2koq3b4eg0ijfwcmsD0dCHmcefL5V48YtQLVYIg1opEvpq2oVECNcevG5bMTjbMLJ5Cncdx23JH53O1MxlM=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '9.0.2 (24217) ',
        device_model: 'iPhone 13 Pro Max',
        tg_id: '5862141202',
        phone: '6281298171192',
        username: 'ezychacuc3',
        last_time: '1674150350',
        password: 'ezychacuc3_5862141202',
        key: '1BVtsOIYBuzsoRLutM7cQzJdYOajeVIZ-tNgTGGMxX5KOerMnuR_a3A9pb3_uT4BQ59ldds53rs6NtFT61HyrYycSI1jGtRQJ3W9wmEu4yftG6G_HjYsCcwNyJs-33Ec5r8n5LkZFh0Jxp6Dt3Tojv-qhEmPZO9wFOfs3Wb0lEd-mwdRlVnAk_NNz67wWOXI5S2KPND9WZp9LLWwAw0d9O3xsXn4gRRUE_xsF0Isl0z1Li3wmF0WqTrPnbhzjOiO8qBP0fQviZRwKY83EPJFYWsjH2vmn-XDw_UOXfKZOw2qn6Cc8g_WlQaXt2RBGsrhD2mD33VT7AfRTf9YaRI-6R0iZa_mdPzU=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.3',
        app_version: '9.0.2 (24217) ',
        device_model: 'iPhone 12',
        tg_id: '5800781096',
        phone: '6281389284625',
        username: 'shyqonory10',
        last_time: '1674150350',
        password: 'shyqonory10_5800781096',
        key: '1BVtsOIYBu2XeISauUMfppahowO9WRr8rv9Qc0wXXpZuSiIX7g2OeLHh-KsMev2Y1EkOVLlQgoH-BFmxyNLmjPbkKIbOAsxrxJYHQavlubGTba98kjUmHq0zyViqiuaSRNHIY95uNW9VFT3cu8PQJfNVcTCWd2GrpxUe0jxTl4Sj6dbwehGoN-TsGdRqjXfrYoQmL2KDzuLAYVzMNFY4_xAtRKhAmTvOKzwubnRtEMpUtPmaqh65yoEL8JWRLyDGO5kgTB9u6a97Gd6zsrhgn5srS95n-OzVrsdzaV3qOtmXv85IWfpOmKF_fzI2jUuwA0bcieqXMI4Z71g830LCcQCAsWZYeGV4=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '9.0.1 (24209) ',
        device_model: 'iPhone 11 Pro',
        tg_id: '5931514434',
        phone: '6281389285330',
        username: 'chuhicheqaz10',
        last_time: '1674150350',
        password: 'chuhicheqaz10_5931514434',
        key: '1BVtsOIYBu5pF7wsukv3gGcVikXrn8tLjmQyREmlQd5eA8Iyw2TXkWnyCDVAQ4fud-_DJaSATy1EyZOKOsstM-8mBESoqR67LPcRxz4eolvcFVbUhdm2zr-PVuGbnSNyjx8O08GlEEb3Z0bKG9FfZ-ySvnFfilhpr_T-jl7FmQVspnCaNkuLfzt289Yi0pH1XaZEPv7YM7PK5yVd0cFSoJVJy-RXxz3rSyp4ccPZHEgHEBJ0SCSzA9-xZ0NsmrMRKcARStZbeKo2RgJn7GT2fbp_dXryTW7V5BtIL8CUmBDKGZg6m_2DSk4hpqKopRonhi0CCPgim7a4NP5AScdyEO2813Y_sFVk=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0',
        app_version: '9.0.1 (24209) ',
        device_model: 'iPhone XS',
        tg_id: '5868924831',
        phone: '6281295884190',
        username: 'oqudaqy9',
        last_time: '1674150350',
        password: 'oqudaqy9_5868924831',
        key: '1BVtsOIYBuwNa567m4yR6Mo3g-VVmUFP1gEOfSi-fg6JbjPxJ0_LYuKdOz_aoQ0ogE9BtKvSmEE_48r2-Chj6tyhb0WWM4X6wk_z1CsJVtHqJ14T2S2SWM37BGNe_YEINLLtvtxgedrvU44VoSVgYTBJ6X0_OrByWQ7F1pyzIkpZxxWCWCPb5rIwE_z-CUkepSfd-4zs9GV7qRzsMbMxXdtUKZGNp7hCf2JPEyi9TG7atvY62CFKg07kDlPv44V3vzTyOqmNSAt0CpuKfQoGrbLYZdH-1sYonsjHYBWp_UwFU6Nw9gsDEogUz_-9V6Uztng43xBZ-pTw7XW8QSUvWkG5VW6eZrgA=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0',
        app_version: '9.0.1 (24209) ',
        device_model: 'iPhone 12',
        tg_id: '5829749007',
        phone: '6281333671812',
        username: 'ligomiki4',
        last_time: '1674150350',
        password: 'ligomiki4_5829749007',
        key: '1BVtsOIYBu23nWq4x_aeDnTlBWGzibFHEBe8I_r2ZTUk5jweqDJTKZ0ocN73eQddC4BDKXrBG6NTKRmlFdJxUgx6OWcZZj_CI2CZCk3-7qn3FBkQs27Ea8GYE39T-NLkjcXwyOhvjwCx-M9TMjzA5ygNpVWyJR8kHWLUbmcTtiB8LNo86wU9tR7OagR_EZnwkdbqdS1FdlUWPUSaQcClmPEUkbPzoq7qgjUQNXPaKaF9mWmNkh1ulcPdH_h4G66ty_l2bwoWENx6zyixR0Tg2GqL4z3ILoEd6AA9BwXnwtPCSY6OyHYEJ-1ZybVSDH_67Dj3KfgQ0haizIBjToZpZamiCmOn8iaE=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '8.9.1 (23989) ',
        device_model: 'iPhone 13 Pro Max',
        tg_id: '5936948851',
        phone: '6281254311713',
        username: 'vykhimeti7',
        last_time: '1674150350',
        password: 'vykhimeti7_5936948851',
        key: '1BVtsOIYBu76GRgWMkZhkeZKaKhTQuvNLTZp9-tv5mLb4GWxtc0_K7yOPGTXi2AcyjaOfn0G3dGVfWITRh40ljd4wRf5ld1ImbHCJT5poTzIgd0Q_HUhpId_FN6nmPx7py3Qo78rLbcSDCvN7rGMIJKW6b7HQ6U8wrg5_UKg7WPvpXNcIWc-enJL-w4RtjZ5Cb6ECKEGi8Sq_eCWPaJ9embw1mXXD8OuspNUsNZMBljKid3OkN4-6qGZwitAMUqkrEpP9puDuMZV2ehKSjyPvBsxdHc_1_dLkrLqSAIdmJc8z6D71dtATDICsOj0Mb0xSySxTxK8qspcc_Z-KvzwxVkoD4f9ZICs=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '8.9.1 (23989) ',
        device_model: 'iPhone 12 Pro Max',
        tg_id: '5819249366',
        phone: '6281328139265',
        username: 'gogeshyr10',
        last_time: '1674150350',
        password: 'gogeshyr10_5819249366',
        key: '1BVtsOIYBu5HQFB8s8ldvGTqaQN7cWsxHZ9JkNgLdPyReQC_UeiAwWDH_juj07BsYsuwX6T8WCth0e0fwdciVfxxe9CnStyTprrnRczGPxBCW1pj0hDbu3Ztbji8kZu7WP_4V5_x3AAnubkEEVeFfrYJ-oe6DJpJPbKz5_GcTt5jGfGAxq5ygATK4esRGl4rBoAh6R8XtsnvfUfa9-sMVJud_RisPSG2JVdhOcVbgweOoKSrR1u8kOTWLLWNyM62BUeoyK_P9AYpwR2AYVwl9kzvGOKpMEhdb-WMYITp9smI0pJgheCx9FBRpaX9aXDTuwQJLpxnhp7GrJueAIkkJN7ShPqW6D3M=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.2',
        app_version: '9.0.1 (24209) ',
        device_model: 'iPhone 12',
        tg_id: '5970406966',
        phone: '6281292021366',
        username: 'ryfeluvu6',
        last_time: '1674150350',
        password: 'ryfeluvu6_5970406966',
        key: '1BVtsOIYBuwfD5o_4G_vsGKjAxz5921ijbg5J0_rHi4N-e5PA-0BYDhyiIrPv9MTARZXqTDskXYalRdPEv46GCrpCfc6y_sDKmUhGYKrkdt9QlZO8MuSP1tZhWOpras1xy5mQYptj9HCbrvI_huLfflos2JjURzerpUVFy1txsnnCrU5Lsbs0PE7m5-Dp-oMjfqwYWOVF_AxgYAlbNm9DYPzNnZy4dvKRSOc9VMFNSX_cHMbrya3M-i_7qKbpYN6o-I7IpjieBMCed0DTLMNG0uAOZtdiiqzk5TtO5IVQ593arYJv6rd4Yrzydl053Wq0-YYF_796twP9rLzbKV_jz9XZLwpR7xk=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3.1',
        app_version: '9.0.2 (24217) ',
        device_model: 'iPhone X',
        tg_id: '5845821008',
        phone: '6281389285094',
        username: 'chepichigofa7',
        last_time: '1674150350',
        password: 'chepichigofa7_5845821008',
        key: '1BVtsOIYBuyzbKmGqS78PhVIvkpBnhdhRP_Fmgk0jwwqsMYvwlncxEh_0do1XKny1oG3G1Z1P0LOWTHuKYuhUjBguhfWJQoeJFQmhzu5UHAYCu7XMCFE7C2XUK_zW_GZh9qro98eUSi6ktyihTtL-PyV0UjuRyWM1J_GldqXBQZb1H-b2GwXL_rOQRaYOg-yBxk9qCfggHCpYVMpB4AcrTevPBmCo_0wKOm8VllpvLCRQhNhEISHz1DZrYEaknwP_kg8M8hfYRVEh7mW1soxbTzovmpsP4goQKEmDVJHJ4IJ97ZcMg6TSUdgqU8hzXvO7ZzHzwuiEG2TdIpS2BUfrL6kTOa1cgos=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '16.0.2',
        app_version: '8.9.1 (23989) ',
        device_model: 'iPhone XS',
        tg_id: '5971170100',
        phone: '6281389285344',
        username: 'ithipyjoqyj8',
        last_time: '1674150350',
        password: 'ithipyjoqyj8_5971170100',
        key: '1BVtsOIYBuwNcXXFrodyfCpXfoTH8hhFWyqeo-zpCgsFyApwhIOOq3SJLmBm0ARw6-94sVJW356eUPhtAlLuseKFp2Q1T3f5yne5m8BCO58yeoEk8d6j0E6MilWxhF7H4j9jkLuJvVShLvR-syJ_-guXkFRMiF3-9Ifp30hduA6IXz12W2gy726VwaRwqmTjNwq8WiDj-aJNrmHEOjR74AroCYkliNBdWaboq9qmyncNfd3o8Vznzf72Iy_5WnAIzIwateUywjeW0xif3ld72bhLX-HTae0lAVouc51XL719sNA-ew55dKe5TqRNK1Wmfsgl4hGRzd3S8ceA-Ty6IcnHhzinOhPo=',
      },
      {
        api_id: '8',
        api_hash: '7245de8e747a0d6fbe11f7cc14fcc0bb',
        system_version: '15.3',
        app_version: '9.0.1 (24209) ',
        device_model: 'iPhone XS',
        tg_id: '5738633737',
        phone: '6281389285347',
        username: 'hochalow9',
        last_time: '1674150350',
        password: 'hochalow9_5738633737',
        key: '1BVtsOIYBuwmg-vbwVTn1hZi8aU79FB8E_Gat0iWhclVL_aVK3aE4ob9v4bT7gP_2ivjnyQiMPGi1CO4D0O1MKU1Q7hG8p0laGpB5k04UKrU0MZb55n2-WgjQzkJ-A36NCvD8ePqvBSoYJMIzDxH7o1cfKir0xGZuKEYZ3oL2nrPAos2CZm5WDXad5b3_QRR4123okyJOrdYXT0UdqYbI6Ar2BF91eQ3KnIr-iru7pBBjh5eMcOm251lixLvsdAMu-9NVwZ-z9dDTVU2qny9fiuP6_2ShHWLEkqNrPqNdxJrBSvfrPvFiHVWBXvGqjDNi70QjMWX4yzIRefoTUvJqxN80FCpReYc=',
      },
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
    ];
    this.currentSession = [{}, {}, {}, {}, {}];
  }

  async createChat(title, description, invite_users, index) {
    try {
      const telegram = await this.initTelegram(index);
      const me = await telegram.getMe();
      console.log(me.username);
      const result = await telegram.invoke(
        new Api.channels.CreateChannel({
          title: title,
          about: description,
          megagroup: true,
        })
      );
      const chat = await telegram.getEntity(result.chats[0]);

      // for (const { tlg_login, tlg_user_id } of invite_users) {
      try {
        const result = await telegram.invoke(
          new Api.channels.EditAdmin({
            channel: chat,
            userId: 'izyvipe1',
            adminRights: new Api.ChatAdminRights({
              changeInfo: true,
              postMessages: true,
              editMessages: true,
              deleteMessages: true,
              banUsers: true,
              inviteUsers: true,
              pinMessages: true,
              addAdmins: true,
              anonymous: false,
              manageCall: true,
              other: true,
            }),
            rank: 'Admin',
          })
        );
      } catch (e) {
        console.log(e);
        // continue;
      }
      // }
      const res = await telegram.invoke(
        new Api.messages.ExportChatInvite({
          peer: chat.id,
          requestNeeded: false,
          title: 'Инвайт ссылка',
        })
      );
      const pwd = await telegram.invoke(new Api.account.GetPassword());
      const your_password = this.currentSession[index].password;
      const passSrp = await computeCheck(pwd, your_password);
      try {
        // for (const { tlg_login, owner } of invite_users) {
        // if (owner) {
        await telegram.invoke(
          new Api.channels.EditCreator({
            channel: chat,
            userId: 'izyvipe1',
            password: passSrp,
          })
        );
        // }
        // }
      } catch (e) {
        console.log(e);
        return;
      }

      await telegram.invoke(
        new Api.channels.LeaveChannel({
          channel: chat,
        })
      );
      return { url: res.link, chatId: -Number(chat.id.value) };
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async createChats(body) {
    try {
      const chats = await Promise.all(
        body?.chats.map(async (o, index) => {
          while (true) {
            const chat = await this.createChat(
              o.title,
              o.description,
              body.invite_users,
              index
            );
            if (!chat) {
              await this.disconnect(index);
              continue;
            }
            return chat;
          }
        })
      );
      console.log(chats);
      return chats;
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest('Аккаунты отсутствуют');
    }
  }

  isEmpty(object) {
    return Object.keys(object).length === 0;
  }

  async initTelegram(index) {
    if (this.isEmpty(this.telegram[index])) {
      this.currentSession[index] = this.telegramSessions.pop();
      const stringSession = new StringSession(this.currentSession[index].key);
      this.telegram[index] = new TelegramClient(
        stringSession,
        Number(this.currentSession[index].api_id),
        this.currentSession[index].api_hash
      );
      await this.telegram[index].connect();
      await this.telegram[index].invoke(
        new Api.account.UpdateProfile({
          firstName: 'Group',
          lastName: 'Maker',
          about: 'Group Maker',
        })
      );
    }
    return this.telegram[index];
  }

  async disconnect(index) {
    await this.telegram[index].disconnect();
    await this.telegram[index].destroy();
    this.telegram[index] = {};
  }
}

module.exports = new TelegramService();
