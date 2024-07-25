const { createClient } = require('@supabase/supabase-js')
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Below is a Typical example of Express API implementation with 
// Supabase DB

exports.createUser = async (req, res) => {
    try {
      const { name,email, password } = req.body
      const { data: user, error: err } = await supabase
        .from('profiles') // Selection
        .select('*')     // Projection without join
        .select(`*, attendance(*)`) // Projection with join
         .eq('email', email) // Condition (single)
         .eq('email', email)
         .eq('password', password) // condition (multiple, can be more by adding more .eq())
         .eq('name', name)
      if (err) throw err
      if (user.length !== 0)
        throw new Error('A user with this email already exists.')
      const { data: newUser, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      if (error) throw error
      return res.status(201).send({ // Sending response to frontend
        data: newUser.user,
        error: null,
      })
    } catch (err) {
      console.log(err)
      return res.status(409).send({
        data: null,
        error: err.message,
      })
    }
  }