import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { useMutation,useQuery,useQueryClient } from "react-query";
import TodoCard from "./TodoCard";
import { addTodo, fetchTodos } from "./api";
import { Todo } from "./types";
import {  useState } from "react";


const Query = () => {

    const [search, setSearch] = useState<string>("");
    const queryClient = useQueryClient();
    
    const cachedData = queryClient.getQueryData(["todos",{search}]);
    console.log(cachedData);
    

    

    const [title,setTitle] = useState<string>("");



    const { data: todos, isLoading} = useQuery({
        queryFn: async () => await fetchTodos(search),
        queryKey: ["todos",{search}],
   
        
    });
    
    const {mutateAsync: addTodoMutation} = useMutation({
        mutationFn: addTodo,
        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        },
        
    });

    if (isLoading) {
        return <div>Loading...</div>
    }
  

    return (
        <>
            <div className="flex gap-3">

                <div className=" p-10">
                    {

                        todos?.map((todo: Todo) => <TodoCard key={todo.id} todo={todo} />)
                    }

                </div>
                <div className="w-full p-10">
                    <input value={title} type="text" placeholder="title" className="showBorder" onChange={(e)=>setTitle(e.target.value)}  />
                    <button className="btn btn-success" onClick={async() =>{
                        
                       try {
                        await addTodoMutation({title});
                        setTitle("");
                        
                       } catch (error) {
                        console.error(error);
                       }
                        
                        }}>Add Todo</button>
                     
                </div>
            </div>
        </>
    )
}

export default Query
