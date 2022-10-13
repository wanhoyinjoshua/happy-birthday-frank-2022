// pages/api/auth/[...auth0].js
import { handleAuth,handleLogin,handleCallback, getAccessToken} from '@auth0/nextjs-auth0';

export default handleAuth(
    
    { async login(req, res) { 
        
        await handleLogin(req, res, { returnTo: `/Example`,  })
       
        
        
    },
}

    
    );