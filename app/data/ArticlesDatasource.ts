import Article from "../models/Article";

const ArticlesDatasource: Array<Article> = [
    { name: "Loafers", price: 280, picture: require('../assets/articles/mocassins.webp') },
    { name: "Sunglasses", price: 140, picture: require('../assets/articles/aviators.webp') },
    { name: "Black Handbag", price: 300, picture: require('../assets/articles/sac_noir.webp') },
    { name: "High Heels", price: 400, picture: require('../assets/articles/chaussure_talon.webp') },
    { name: "Necklace", price: 98, picture: require('../assets/articles/collier.webp') },
    { name: "Scarf", price: 110, picture: require('../assets/articles/echarpe.webp') },
    { name: "Blouse", price: 260, picture: require('../assets/articles/blouse.webp') },
    { name: "Patek Philippe", price: 27150, picture: require('../assets/articles/patek_philippe.webp') },
    { name: "Coat", price: 420, picture: require('../assets/articles/manteau.webp') },
    { name: "Submariner", price: 4200, picture: require('../assets/articles/submariner.webp') },
    { name: "Sneakers", price: 110, picture: require('../assets/articles/basket.webp') },
    { name: "Cap", price: 110, picture: require('../assets/articles/casquette.webp') },
]

export default ArticlesDatasource;