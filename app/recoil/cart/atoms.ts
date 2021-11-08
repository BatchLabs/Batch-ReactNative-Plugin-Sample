import { atom, selector } from "recoil";
import Article from "../../models/Article";

const cartArticlesState = atom({
  key: 'cartArticlesState', 
  default: [] as Article[],
});

const cartAmountState = selector({
  key: 'cartAmountState',
  get: ({get}) => {
    const list = get(cartArticlesState);
    if(list.length == 0) return 0;
    return list.map(item => item.price).reduce((prev, next) => prev + next);
  },
});

export { cartArticlesState, cartAmountState };