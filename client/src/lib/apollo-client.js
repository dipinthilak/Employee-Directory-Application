import {ApolloClient,InMemoryCache,HttpLink} from "@apollo/client";

console.log(process.env.URI);



const client = new ApolloClient({
    link: new HttpLink({ uri: process.env.NEXT_PUBLIC_GQL_URL, }),
    cache: new InMemoryCache({
        typePolicies:{
            Query:{
                fields:{
                    getAllgetAllEmployees:{
                        keyArgs:false,
                        merge(existing=[],incoming){
                            return[...existing,...incoming];
                        }
                    }
                }
            }
        }
    })
});
 
export default client;