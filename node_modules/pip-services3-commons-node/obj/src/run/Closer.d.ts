/**
 * Helper class that closes previously opened components.
 *
 * [[ICloseable]]
 */
export declare class Closer {
    /**
     * Closes specific component.
     *
     * To be closed components must implement [[ICloseable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param component 		the component that is to be closed.
     * @param callback 			callback function that receives error or null no errors occured.
     *
     * @see [[IClosable]]
     */
    static closeOne(correlationId: string, component: any, callback?: (err: any) => void): void;
    /**
     * Closes multiple components.
     *
     * To be closed components must implement [[ICloseable]] interface.
     * If they don't the call to this method has no effect.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param components 		the list of components that are to be closed.
     * @param callback 			callback function that receives error or null no errors occured.
     *
     * @see [[closeOne]]
     * @see [[IClosable]]
     */
    static close(correlationId: string, components: any[], callback?: (err: any) => void): void;
}
