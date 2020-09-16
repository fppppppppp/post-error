// import  { Component }  from "react";
// import * as React from "react";
import { pushErrorInfo } from "../service/handleErrorPost";
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
export function postErrorReact(React) {
    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
        }
        componentDidCatch(error, info) {
            pushErrorInfo(error);
            this.setState({ error, info });
        }
        render() {
            const { error } = this.state;
            if (error) {
                const { FallbackComponent } = this.props;
                if (FallbackComponent)
                    return React.createElement(FallbackComponent, this.state);
                return null;
            }
            return this.props.children;
        }
    }
}
//# sourceMappingURL=bind-other.js.map