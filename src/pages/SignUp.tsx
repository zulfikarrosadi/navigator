import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from '../axios'
import { AxiosResponse } from 'axios';
import { ApiResponse } from '@/schema';
import useAuth from '@/hooks/useAuth';
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useState } from 'react';

type LoginDataResponse = {
  id: number,
  username: string
}

const formSchema = z.object({
  username: z
    .string({ required_error: 'username is required' })
    .trim()
    .min(1, 'username is required'),
  key: z
    .string({ required_error: 'key is required' })
    .trim()
    .min(1, 'key is required'),
  keyConfirmation: z
    .string({ required_error: 'confirmation key is requried' })
    .trim()
    .min(1, 'confirmation key is required')
}).refine((data) => data.key === data.keyConfirmation,
  { path: ['keyConfirmation'], message: "key and key confirmation din't match" }
);

type ServerError = { message: string, code: number }

function SignUp() {
  const [serverError, setServerError] = useState<ServerError>()
  const { setAuth } = useAuth()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      key: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data: res } = await axios.post<
        {}, AxiosResponse<ApiResponse<LoginDataResponse>>
      >(
        '/signup',
        JSON.stringify(values),
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (res.status === 'success') {
        setAuth({
          username: res.data.users.username,
          id: res.data.users.id
        })
      }
    } catch (error: any) {
      if (error.response.data.status === 'fail') {
        setServerError({
          message: error.response.data.error.message,
          code: error.response.data.error.code
        })
      }
    }
  }

  return (
    <div className='w-10/12 h-full flex items-center mt-5 flex-col gap-10'>
      {serverError && serverError.message && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something is wrong</AlertTitle>
          <AlertDescription>
            {serverError.message}
          </AlertDescription>
        </Alert>
      )}
      <h1 className="text-xl font-bold ">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Input your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <Input placeholder="Input your key" {...field} />
                </FormControl>
                <FormDescription>
                  It's like a password, to access your account and manage your
                  links
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keyConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Confirmation</FormLabel>
                <FormControl>
                  <Input placeholder="Input your key confirmation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      </Form>
    </div>
  );
}

export default SignUp;
