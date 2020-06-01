import { USER_SIGNUP, SHOW_USER, SIGN_IN,SHOW_USER_BY_ID} from '../constants/';
import axiosapi from '../../api/axiosapi';

export const sign_up= (formValues) => async dispatch =>{
 console.log("form fields",formValues);
 const response = await axiosapi.post('/users/signUp',formValues);
    console.log("add admin data",response.data)
        dispatch({
            type:USER_SIGNUP,
            payload:response.data,
            status:response.status
        });       
} 

export const check_email=(email)=>async dispatch=>{
    let response = await axiosapi.get('/users/check_email',{params:{email:email}});
    console.log("check Email",response.data.message)
    let message;       
        message=response.data.message              
    dispatch({
        type:"CHECK_EMAIL",
        payload:response.data.found,
        message:message  
    })
}

export const reset_message=()=>async dispatch=>{
    dispatch({
        type:"RESET_MESSGAE"
    })
}

export const validation_message=(message)=>async dispatch=>{
    console.log("message",message)
    dispatch({
        type:"VALIDATION_MESSAGE",
        payload:message
    })
}

export const login = (formValues)=> async dispatch=>{
    const response = await axiosapi.post('/users/login',formValues);
    console.log("login data",response.data)
    if(response.data.success){
        dispatch({
            type:SIGN_IN,
            payload:response.data,
            user_type:response.data.rows[0].user_type,
            status:response.status
        });
    }else{
        dispatch({
            type:SIGN_IN, 
            payload:response.data,
            user_type:"",
            status:response.status
        });
    }
};  
 
   export const adminAddUser = (status, name, email,password,dob,designation)=> async dispatch=>{
    console.log("admin data",status, name, email,password,dob,designation)
    const response = await axiosapi.post('/users/UserByAdmin',{ 
        status:status,      
        name:name,
        email:email,
        password:password,
        dob:dob,
        designation:designation
   });
    console.log("add admin data",response.data)
    if(response.data.success === true){
        let res = await axiosapi.get('/users/show_users') 
        dispatch({
            type:"ADD_ADMIN_USER",
            payload:res.data,
            status:response.status
        }); 
        
    }
    } 

export const show_User=()=>async dispatch=>{
    let response = await axiosapi.get('/users/show_users')
    console.log("admin user list data",response)
    
    dispatch({
        type:SHOW_USER,
        payload:response.data,
        status:response.status,
    })
} 

export const delete_user=(user_id)=>async dispatch=>{
    let res = await axiosapi.delete('/users/deleteUser',{params:{id:user_id}})
    console.log(res)
    if(res.data.success === true){
        let response = await axiosapi.get('/users/show_users')
        dispatch({
            type:"DELETE_USER",
            payload:response.data,
            status:res.status
        })
    }
}

export const showUserById=(id)=>async dispatch=>{
    let response = await axiosapi.get('/users/show_user_by_id',{params:{id:id}});
    console.log("paymentid",id,response.data)
        dispatch({
            type:SHOW_USER_BY_ID,
            payload:response.data,
            status:response.status
        })
     
}

export const UpdateUser=(user_id,status, name, email,dob,designation)=> async dispatch=>{
    console.log("admin values", user_id,status, name, email, dob, designation)
    let res= await axiosapi.post('/users/update_user',{
        id:user_id,
        status:status,
        name:name,
        email:email,
        dob:dob,
        designation:designation

    });
    console.log("add admin data",res.data)
      if(res.data.success === true){
        let response = await axiosapi.get('/users/show_users')
                dispatch({
                    type:"UPDATE_USER",
                    payload:response.data,
                    status:res.status
                })
        }
}


export const Add_Todo = (todo, user_id)=> async dispatch=>{
    console.log("admin data",todo, user_id)
    const response = await axiosapi.post('/users/AddTodo',{ 
         user_id: user_id,
         todo: todo
   });
    console.log("add todo data",response.data)
    if(response.data.success === true){
        let res = await axiosapi.get('/users/show_todo_by_id',{params:{id:user_id}}) 
        dispatch({
            type:"ADD_TODO",
            payload:res.data,
            status:response.status
        }); 
        
    }
    } 

    export const showTaskById=(id)=>async dispatch=>{
        let response = await axiosapi.get('/users/show_todo_by_id',{params:{id:id}});
        console.log("paymentid",id,response.data)
            dispatch({
                type:"ADD_TODO",
                payload:response.data,
                status:response.status
            })
         
    }

    export const delete_task=(id,user_id)=>async dispatch=>{
        let res = await axiosapi.delete('/users/deleteTask',{params:{id:id}})
        console.log(res)
        if(res.data.success === true){
            let response = await axiosapi.get('/users/show_todo_by_id',{params:{id:user_id}})
            dispatch({
                type:"ADD_TODO",
                payload:response.data,
                status:res.status
            })
        }
    }

    export const showTaskByUserId=(id)=>async dispatch=>{
        let response = await axiosapi.get('/users/todo_by_id',{params:{id:id}});
        console.log("paymentid",id,response.data)
            dispatch({
                type:"TASK_BY_ID",
                payload:response.data,
                status:response.status
            })
         
    }
    
    export const Update_Todo=(todo, user_id, task_id)=> async dispatch=>{
        console.log("admin values", todo, user_id, task_id)
        let res= await axiosapi.post('/users/update_todo',{
            todo_task: todo,
            user_id:user_id,
            id: task_id    
        });
        console.log("add admin data",res.data)
          if(res.data.success === true){
            let response = await axiosapi.get('/users/show_todo_by_id',{params:{id:user_id}})
                    dispatch({
                        type:"ADD_TODO",
                        payload:response.data,
                        status:res.status
                    })
            }
    }

    export const showTask=()=>async dispatch=>{
        let response = await axiosapi.get('/users/show_task')
        console.log("admin user list data",response)
        
        dispatch({
            type:"SHOW_TASK",
            payload:response.data,
            status:response.status,
        })
    } 