import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { Postvalidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queryandmutations"
import { useUserContext } from "@/context/Authcontext"
import { useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"

 

type Postformprops={
    post?:Models.Document;
    action:'Create' | 'Update'
}


const Postform = ({post,action}:Postformprops) => {
    const{mutateAsync:createPost,isPending:isLoadingCreate}=useCreatePost()
    const{mutateAsync:updatePost,isPending:isLoadingUpdate}=useUpdatePost()
     


    const {user}=useUserContext()
    const {toast}=useToast()
    const navigate=useNavigate()


      // 1. Define your form.
  const form = useForm<z.infer<typeof Postvalidation>>({
    resolver: zodResolver(Postvalidation),
    defaultValues: {
      caption:post? post.caption:"",
      location:post? post.location:"",
      tags:post? post.tags.join(','):"",
      file:[]
    },
  })
 
  // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof Postvalidation>) {
    if(post && action ==='Update'){
      const updatedPost= await updatePost({
        ...values,
        postId:post.$id,
        imageId:post?.imageId,
        imageUrl:post?.imageUrl
      })
      if(!updatedPost){
        toast({title:"Please try againi."})
      }
      return navigate(`/posts/${post.$id}`)
    }

    const newPost=await createPost({
        ...values,
        userId:user.id
    })
    if(!newPost){
        toast({
            title:'Please try again'
        })
    }
    navigate('/')
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Caption:</FormLabel>
            <FormControl>
              <Textarea className="shad-textarea custom-scrollbar" placeholder="caption..." {...field} />
            </FormControl>
            
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add photos:</FormLabel>
            <FormControl>
            </FormControl>
            <FileUploader
                fieldchange={field.onChange}
                mediaurl={post?.imageUrl} />
            
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add location:</FormLabel>
            <FormControl>
            </FormControl>
            <Input type="text" className="shad-input" {...field}/>
            
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add tags:</FormLabel>
            <FormControl>
            </FormControl>
            <Input type="text" className="shad-input"{...field} />
            
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
      <div className="flex gap-4 items-center justify-end">
        <Button type="button" className="shad-button_dark_4">Cancel</Button>
        <Button type="submit" className="shad-button_primary whitespace-nowrap"
        disabled={isLoadingCreate||isLoadingUpdate} >
          {isLoadingCreate||isLoadingUpdate && 'Loading...'}
          {action} post
          </Button>
      </div>
    </form>
  </Form>
)
  
}

export default Postform