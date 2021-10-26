<?php
    if( isset($_POST['login']) )
    {
        $username = $_POST['username'];
        $password = $_POST['password'];
        if ($username == 'admin' && $password =='123')
        {
            header('location:clickmode.html');
        }
        else{
            header('location:login.html');
        }
    }
    
    if(isset($_POST['logout']) )
    {
        header('location:login.html');
    }
?>
<!-- <form action="login.php" method="POST"> 
    <label>email</label>
    <input type="text" name="email">
    <label>Password</label>
    <input type="text" name="password">
    <button type="submit" name="dangnhap"> dang nhap</button>

</form> -->