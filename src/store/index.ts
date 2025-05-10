import { configureStore} from '@reduxjs/toolkit';

import { createAPI } from '../services/api';
import { catalogReducer } from './catalog-slice/catalog-slice';
import { productDataReducer } from './product-slice/product-slice';
import { orderReducer } from './order-slice/order-slice';
import { sortReducer } from './sort-slice/sort-slice';
import { filterReducer } from './filter-slice/filter-slice';

const api = createAPI();

const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    product: productDataReducer,
    order: orderReducer,
    sort: sortReducer,
    filter: filterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }
    ),
});

export { store };
