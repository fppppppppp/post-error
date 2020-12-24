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
function pluginReact(React) {
    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false };
        }
        componentDidCatch(error, info) {
            this.setState({ hasError: true });
        }
        render() {
            if (this.state.hasError) {
                const { FallbackComponent } = this.props;
                if (FallbackComponent)
                    return React.createElement(FallbackComponent, this.state);
                return null;
            }
            return this.props.children;
        }
    }
    return {
        name: "react",
        plugin: ErrorBoundary
    };
}
export { pluginReact };
//# sourceMappingURL=plugin-react.js.map