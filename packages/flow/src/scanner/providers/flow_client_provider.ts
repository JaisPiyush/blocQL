import { ClientProvider } from "types/src/providers/client_provider";
import { FlowClient } from "../../client/flow_client";
import { FlowConfigProvider } from "../providers/config_provider";

export type FlowClientProvider = ClientProvider<FlowClient>;

let _flowClient: FlowClient | undefined = undefined;

export const flowClientProvider =
    (configProvider: FlowConfigProvider) => async () => {
        if (!_flowClient) {
            _flowClient = new FlowClient(configProvider().flowAccessNode);
        }

        return _flowClient;
    };