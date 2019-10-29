import { fork, all } from "redux-saga/effects";

import {watchFetch} from './commentsSaga'
import {watchAgeUp } from './ageSaga'

export default function* rootSage(){
    yield all([
        fork(watchAgeUp),
        fork(watchFetch),
    ]);
}