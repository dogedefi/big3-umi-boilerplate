import { gql } from '@apollo/client';

export const GQL_ADDRESSES_WITH_LABELS = gql`
    query AddressesWithLabels($labels: [String!], $mode: String!, $baseId: Int, $limit: Int) {
        labels_query_addresses_action(limit: $limit, base_id: $baseId, mode: $mode, labels: $labels) {
            address {
                is_contract
                value
            }
            labels {
                name
                content
                source
            }
            hasCollect
            user_introduction
            user_name
            id
        }
    }
`;

export const GQL_ADDRESSES_WITH_LABELS_TOTAL = gql`
    query AddressesWithLabelsTotal($labels: [String!], $mode: String!) {
        labels_count_action(mode: $mode, labels: $labels) {
            count
        }
    }
`;

export const GQL_LABEL_DESCRIBE = gql`
    query LabelDescribe($labelName: String!) {
        dictionary_describe_label_name_action(labelName: $labelName) {
            englishDescribe
            labelId
            collectionCount
            hasCollect
            source
            userDescribe
            userName
            refreshTime
        }
    }
`;

export const GQL_LABEL_POPULAR = gql`
    query LabelPopular {
        label_popular_action {
            dataList {
                id
                name
                source
                owner
                type
                content
            }
            total
        }
    }
`;

export const GQL_ADDRESS_WITH_LABELS_BY_ADDRESS = gql`
    query AddressWithLabelsByAddress($address: String!) {
        address_query_labels_action(address: $address) {
            address
            address {
                is_contract
                value
            }
            labels {
                name
                content
                source
            }
            hasCollect
            user_introduction
            user_name
        }
    }
`;
