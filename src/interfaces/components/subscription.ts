import { LockConfig } from "./subscriptionWidget";

export interface ISubscription {
	lockConfig: LockConfig; // required
	maxWidth?: number;
}
