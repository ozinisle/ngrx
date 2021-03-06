import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from "src/app/state/app.state";
import { Product } from "../product";
import * as ProductActions from './products.actions';

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

export interface State extends AppState.State {
    products: ProductState;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);


export const productReducer = createReducer<ProductState>(
    //{ showProductCode: true } as ProductState,
    initialState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
        console.log('Original State: ' + JSON.stringify(state));
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProduct: action.product
        }
    }),
    on(ProductActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: null
        }
    }),
    on(ProductActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            }
        }
    })
)