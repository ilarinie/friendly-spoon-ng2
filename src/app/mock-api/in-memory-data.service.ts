export class InMemoryDataService {
    createDb() {
        let recipes = [
            {
                id: 5,
                name: "Sesamtangot",
                user_id: 2,
                duration: {
                    id: 2,
                    range: "30min - 1h",
                    created_at: "2016-07-14T09:13:08.004Z",
                    updated_at: "2016-07-14T09:13:08.004Z"
                },
                ratingaverage: 5,
                keyword: null,
                ingredients: [
                    {
                        name: "vesi"
                    },
                    {
                        name: "hiiva"
                    },
                    {
                        name: "margariini"
                    },
                    {
                        name: "vehnäjauho"
                    },
                    {
                        name: "maito"
                    },
                    {
                        name: "maito"
                    },
                    {
                        name: "maito"
                    },
                    {
                        name: "suola"
                    },
                    {
                        name: "sesamsiemeniä"
                    }
                ],
                recipe_tags: []
            },
            {
                id: 6,
                name: "Kauralastut",
                user_id: 2,
                duration: {
                    id: 1,
                    range: "0min - 30min",
                    created_at: "2016-07-14T09:13:07.932Z",
                    updated_at: "2016-07-14T09:13:07.932Z"
                },
                ratingaverage: 7,
                keyword: null,
                ingredients: [
                    {
                        name: "margariini"
                    },
                    {
                        name: "sokeri"
                    },
                    {
                        name: "vehnäjauho"
                    },
                    {
                        name: "kaurahiutale"
                    },
                    {
                        name: "leivinjauhe"
                    },
                    {
                        name: "kananmuna"
                    }
                ],
                recipe_tags: [
                    {
                        id: 1,
                        title: "Cookies"
                    }
                ]
            },
            {
                id: 8,
                name: "Pitsarieskat",
                user_id: 1,
                duration: {
                    id: 1,
                    range: "0min - 30min",
                    created_at: "2016-07-14T09:13:07.932Z",
                    updated_at: "2016-07-14T09:13:07.932Z"
                },
                ratingaverage: null,
                keyword: null,
                ingredients: [
                    {
                        name: "Rieskoja"
                    },
                    {
                        name: "Tomaattikastike"
                    },
                    {
                        name: "Juustoraaste"
                    },
                    {
                        name: "Punasipuli"
                    },
                    {
                        name: "Paprika"
                    },
                    {
                        name: "Ananas"
                    },
                    {
                        name: "Pepperoni"
                    }
                ],
                recipe_tags: [
                    {
                        id: 5,
                        title: "Food"
                    }
                ]
            },
            {
                id: 9,
                name: "Chili con Carne",
                user_id: 1,
                duration: {
                    id: 2,
                    range: "30min - 1h",
                    created_at: "2016-07-14T09:13:08.004Z",
                    updated_at: "2016-07-14T09:13:08.004Z"
                },
                ratingaverage: 10,
                keyword: null,
                ingredients: [
                    {
                        name: "vesi"
                    },
                    {
                        name: "sokeri"
                    },
                    {
                        name: "Punasipuli"
                    },
                    {
                        name: "Paprika"
                    },
                    {
                        name: "Paprika"
                    },
                    {
                        name: "Ruokaöljy"
                    },
                    {
                        name: "Valkosipuli"
                    },
                    {
                        name: "Kumina"
                    },
                    {
                        name: "Jauheliha"
                    },
                    {
                        name: "Lihaliemikuutio"
                    },
                    {
                        name: "Tomaatimurska"
                    },
                    {
                        name: "Tomaattipyree"
                    },
                    {
                        name: "Kidneypapuja"
                    },
                    {
                        name: "Meirami"
                    }
                ],
                recipe_tags: [
                    {
                        id: 5,
                        title: "Food"
                    }
                ]
            },
            {
                id: 7,
                name: "Sharlotka",
                user_id: 2,
                duration: {
                    id: 2,
                    range: "30min - 1h",
                    created_at: "2016-07-14T09:13:08.004Z",
                    updated_at: "2016-07-14T09:13:08.004Z"
                },
                ratingaverage: 7,
                keyword: "omena kakku",
                ingredients: [
                    {
                        name: "eggs"
                    },
                    {
                        name: "sugar"
                    },
                    {
                        name: "apples"
                    },
                    {
                        name: "baking powder"
                    },
                    {
                        name: "powdered sugar"
                    },
                    {
                        name: "flour"
                    }
                ],
                recipe_tags: [
                    {
                        id: 4,
                        title: "Cakes"
                    }
                ]
            },
            {
                id: 10,
                name: "Pähkinäinen porkkanapasta",
                user_id: 2,
                duration: {
                    id: 1,
                    range: "0min - 30min",
                    created_at: "2016-07-14T09:13:07.932Z",
                    updated_at: "2016-07-14T09:13:07.932Z"
                },
                ratingaverage: 8,
                keyword: "carrot basil suosikit",
                ingredients: [
                    {
                        name: "kirsikkatomaatteja"
                    },
                    {
                        name: "cashewpähkinöitä"
                    },
                    {
                        name: "porkkanoita"
                    },
                    {
                        name: "basilika"
                    },
                    {
                        name: "sitruunan mehu"
                    },
                    {
                        name: "oliiviöljy"
                    },
                    {
                        name: "Valkosipuli"
                    },
                    {
                        name: "suola"
                    },
                    {
                        name: "mustapippuri"
                    }
                ],
                recipe_tags: [
                    {
                        id: 5,
                        title: "Food"
                    },
                    {
                        id: 6,
                        title: "Pasta"
                    }
                ]
            }
        ];
        let durations = [
            {
                id: 1,
                range: "0-30min"
            },
            {
                id: 2,
                range: "30min-1h"
            },
            {
                id: 3,
                range: "1h-1h30min"
            },
            {
                id: 4,
                range: "1h30min-2h"
            },
            {
                id: 5,
                range: "2h+"
            }
        ];
        let levels = [
            {
                id: 1,
                level: "Easy"
            },
            {
                id: 2,
                level: "Medium"
            },
            {
                id: 3,
                level: "Difficult"
            }
        ];
        return { recipes, durations, levels };
    }
}
