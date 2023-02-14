import { shallowMount } from "@vue/test-utils"

import Navbar from '@/modules/daybook/components/Navbar'
import createVuexStore from "../../../mock-data/mock-data"

describe('Pruebas en el Navbar component', ()=>{

    const store = createVuexStore({
        user: {
            name:'Juan',
            email: 'juan@gmail.com'
        },
        status:'authenticated',
        idToken: 'ABC',
        refreshToken: 'XYZ'
    })

    beforeEach(()=> jest.clearAllMocks() )

    test('Debe de mostrar el componente correctamenta',()=>{
        const wrapper =  shallowMount(Navbar, {
            global:{
                plugins: [store]
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })
    test ('Click en logout, debe de cerrar sesion y redireccionar', async()=>{
        const wrapper = shallowMount(Navbar,{
            global:{
                plugins:[store]
            }
        })
        await wrapper.find('button').trigger('click')

        expect( wrapper.router.push).toHaveBeenCalledWith({ name: 'login' })

        expect(store.state.auth).toEqual({
            user: null,
            status: 'not-authenticated',
            idToken:null,
            refreshToken:null
        })
    })
})