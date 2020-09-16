// import  { Component }  from "react";
// import * as React from "react";
import { pushErrorInfo  } from "../service/handleErrorPost";
// export class ErrorBoundary extends Component{
//   constructor(props: any){
//     super(props);
//   }
//   componentDidCatch(error: Error,info: any){
//     pushErrorInfo(error);
//     this.setState({error,info});
//   }
//   render(){
//     const {error} = this.state as any;
//     if(error){
//       const {FallbackComponent} = this.props as any;
//       if(FallbackComponent) return React.createElement(FallbackComponent,this.state);
//       return null
//     }
//     return this.props.children;
//   }
// }

export function pluginReact(React: any){
  class ErrorBoundary extends React.Component{
      constructor(props: any){
        super(props);
        this.state = { hasError: false };
      }
      componentDidCatch(error: Error,info: any){
        this.setState({ hasError: true });
      }
      render(){
        if(this.state.hasError){
          const {FallbackComponent} = this.props as any;
          if(FallbackComponent) return React.createElement(FallbackComponent,this.state);
          return null;
        }
        return this.props.children;
      }
    }
    return {
      name:"react",
      plugin:ErrorBoundary
    }
}