import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import Swal from 'sweetalert2'

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

jest.mock('sweetalert2', ()=>({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en el Entry View', ()=>{

    const store = createVuexStore(journalState)
    store.dispatch = jest.fn() 
    
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
    test('Debe de borrar la entrada y salr', (done)=>{
        Swal.fire.mockReturnValueOnce( Promise.resolve({isConfirmed: true}))
        
        wrapper.find('.btn-danger').trigger('click')
        
        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Estás Seguro?',
            text: 'Una vez eliminado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText:'Sí, estoy seguro'
        })

        setTimeout(()=>{
            expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-NNwAx5DxbG41eBMMnwO')
            expect (mockRouter.push).toHaveBeenCalled()
            done()
        }, 1)
    })
})