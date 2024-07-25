const { createClient } = require('@supabase/supabase-js')
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


exports.createUser = async (req, res) => {
  try {
    const u_name = req.body.name;
    const u_email = req.body.email;
    const password = req.body.password;
    const u_phone = req.body.mobile_number;
    const u_roll = req.body.university_roll_number;
    const u_stream = req.body.stream;
    const u_year = req.body.year;
    const u_college = req.body.college;

    // First, check if the user already exists in the database
    const { data: existingUser, error: err } = await supabase
      .from('users')
      .select('*')
      .eq('u_email',u_email)

    if (err) throw err;
    if (existingUser && existingUser.length !== 0) {
      throw new Error('A user already exists.');
    }

    // Insert user data into the 'users' table
    const { data: insertedUserData, error: insertError } = await supabase
      .from('users') // Specify the table name
      .insert([{ u_name,u_email,password,u_phone,u_roll,u_stream,u_year,u_college }]); // Pass an array of objects to insert

    if (insertError) throw insertError;

    // Sign up the user using Supabase Auth
    const { user: authUser, error: authError } = await supabase.auth.signUp({
      email: u_email,
      password:password
    });

    if (authError) throw authError;

    // Respond with success
    return res.status(201).send({
      data: authUser,
      error: null,
    });
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      data: null,
      error: err.message,
    });
  }
};

exports.loginUser = async (req,res)=>{
  try{
    const u_email = req.body.email;
     const password = req.body.password;
    console.log(u_email,password);
     const {data:user,error:err} = await supabase
     .from('users')
     .select('*')
     .match({'u_email':u_email,'password':password})
    //  .eq('u_email',u_email)
    //  .eq('password',password)

     if(err) throw err;
      if(user && user.length !== 0){
        res.send('User found');
      }
      else
      {
        res.send('User not found');
      }

  }catch(error){
   console.log(error);
   res.send({
      data:null,
      error:error.message
   })
  }
}