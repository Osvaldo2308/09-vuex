import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'


import journal from '@/modules/daybook/store/journal'
import {journalState} from '../../../../07-journal-main/tests/unit/mock-data/test-journal-state'

import EntryView from "@/modules/daybook/views/EntryView.vue";

const createVuexStore = (initialState) =>
createStore ({
    modules:{
        journal:{
            ...journal,
            state:{ ...initialState}
        }
    }
})

describe('Pruebas en el Entry View', ()=>{

    const store = createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }
    let wrapper

    beforeEach(()=>{
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView,{
            props:{
                id: '-NNwAx5DxbG41eBMMnwO'
            },
            global:{
                mocks:{
                    $router: mockRouter
                },
            plugins: [ store ]
            }
        })
    })
    test('Debe de sacar al usuario por que el ID no existe', ()=>{
        const wrapper = shallowMount( EntryView,{
            props:{
                id: 'Este ID no existe en el STORE'
            },
            global:{
                mocks:{
                    $router: mockRouter
                },
            plugins: [ store ]
            }
        })

        expect (mockRouter.push) .toHaveBeenCalledWith({name: 'no-entry'})
    })

    test('Debe de mostrar la entrada correcta ', ()=>{
        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalled()    
    })
})