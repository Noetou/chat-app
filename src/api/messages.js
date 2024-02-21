import { supabase } from '@/supabase'

export const insertMessage = async (content, userId) => {
  await supabase.from('messages').insert({
    content,
    userId
  })
}

export const fetchMessages = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select('*,author:profiles(username,id,avatar_url)')
    .order('created_at')
    .limit(100)
  if (error) {
    console.error('Error fetching mesages : ',error)
  }
  return data
}
