import { MessageInterface }from './messageInterface'

export interface ErrorInterface extends MessageInterface {
    stack? : string
}