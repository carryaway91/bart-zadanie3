import Nature from './img/headers/pexels-stein-egil-liland-3408744.jpg'
import person1 from './img/people/pexels-andrea-piacquadio-3781569.jpg'
import person2 from './img/people/pexels-andrea-piacquadio-3808113.jpg'
import arch1 from './img/architecture/pexels-alexander-isreb-1797418.jpg'
import arch2 from './img/architecture/pexels-ben-neale-380330.jpg'
import arch3 from './img/architecture/pexels-gdtography-911738.jpg'
import arch4 from './img/architecture/pexels-gdtography-911758.jpg'
import arch5 from './img/architecture/pexels-matheus-natan-3297593.jpg'
import nat1 from './img/nature/pexels-andy-vu-3244513.jpg'
import nat2 from './img/nature/pexels-asad-photo-maldives-3293148.jpg'
import nat3 from './img/nature/pexels-eberhard-grossgasteiger-572897.jpg'
import nat4 from './img/nature/pexels-frans-van-heerden-624015.jpg'
import nat5 from './img/nature/pexels-luis-dalvan-1770809.jpg'
import nat6 from './img/nature/pexels-luis-del-río-15286.jpg'
import nat7 from './img/nature/pexels-ruvim-miksanskiy-1438761.jpg'
import nat8 from './img/nature/pexels-stein-egil-liland-3408744.jpg'
import nat9 from './img/nature/pexels-tobias-bjørkli-2113566.jpg'
import food1 from './img/food/pexels-cats-coming-406152.jpg'
import food2 from './img/food/pexels-daria-shevtsova-704971.jpg'
import food3 from './img/food/pexels-daria-shevtsova-1095550.jpg'
import food4 from './img/food/pexels-dzenina-lukac-1583884.jpg'
import food5 from './img/food/pexels-ella-olsson-1640777.jpg'
import food6 from './img/food/pexels-jonathan-borba-2983101.jpg'
import food7 from './img/food/pexels-lisa-fotios-918327.jpg'
import food8 from './img/food/pexels-lisa-fotios-1279330.jpg'
import food9 from './img/food/pexels-lisa-fotios-1351238.jpg'
import food10 from './img/food/pexels-trang-doan-1092730.jpg'
import art1 from './img/abstract/pexels-jot-2179483.jpg'
import art2 from './img/abstract/pexels-anni-roenkae-2693212.jpg'
import art3 from './img/abstract/pexels-bruno-thethe-1910225.jpg'
import art4 from './img/abstract/pexels-dan-cristian-pădureț-1193743.jpg'
import art5 from './img/abstract/pexels-dom-j-310452.jpg'
import art6 from './img/abstract/pexels-fiona-art-3208282.jpg'
import art7 from './img/abstract/pexels-fiona-art-5022849.jpg'
import art8 from './img/abstract/pexels-hoangloc-dang-5253574.jpg'
import art9 from './img/abstract/pexels-luis-quintero-2471234.jpg'
import art10 from './img/abstract/pexels-rodrigo-souza-2531608.jpg'

interface API {
    headers: {header: string, coverPic: string, link: string, count: number}[],
    galleries: any
}


export const api: API = {
 headers: [
        {
            header: "Príroda",
            coverPic: Nature,
            link: 'priroda',
            count: 10
        },
        {
            header: 'Architektúra',
            coverPic: arch3,
            link: 'architektura',
            count: 5
        },
        {
            header: 'Ľudia',
            coverPic: person1,
            link: 'ludia',
            count: 2
        },
        {
            header: 'Jedlo',
            coverPic: food2,
            link: 'jedlo',
            count: 10
        },
        {
            header: 'Abstraktné',
            coverPic: art1,
            link: 'abstraktne',
            count: 10
        }
    ],
    galleries: {
        architektura: [
            arch1, arch2, arch3, arch4, arch5
        ],
        ludia: [
            person1, person2
        ],
        priroda: [
            nat1, nat2, nat3, nat4, nat5, nat6, nat7, nat8, nat9, Nature
        ],
        jedlo: [
            food1, food2, food3, food4, food5, food6, food7, food8, food9, food10
        ],
        abstraktne: [
            art1, art2, art3, art4, art5, art6, art7, art8, art9, art10
        ]
    }
}