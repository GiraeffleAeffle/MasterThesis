#!/usr/bin/env bash
declare -a supplychain_id_array
declare -a from_eth_address_array
declare -a to_eth_address_array
declare -a batch_id_array
declare -a product_information_array
declare -A lci_array
declare -a ipfsHash_array
declare -a input_array
declare -a output_array
LCIDATA=`cat eventlog.txt`

# Parse data from string

transactionHash_array=(`echo $LCIDATA | tr ',' '\n'| grep "transactionHash"| tr -d '"' | tr ':' ' ' | awk '{print $2}'`)
supplychain_id_array=(`echo $LCIDATA | tr ',' '\n' | grep "_supplyChainId" | tr -d '"' | tr ':' ' ' | awk '{print $2}'`)
#echo "${supplychain_id_array[@]}"
from_eth_address_array=(`echo $LCIDATA | tr ',' '\n' | grep "_fromEthAddress" | tr -d '"' | tr ':' ' ' | awk '{print $2}'`)
#echo "${from_eth_address_array[@]}"
to_eth_address_array=(`echo $LCIDATA | tr ',' '\n' | grep "_toEthAddress" | tr -d '"' | tr ':' ' ' | awk '{print $2}'`)
#echo "${to_eth_address_array[@]}"
batch_id_array=(`echo $LCIDATA | tr ',' '\n' | grep "_batchId" | tr -d '"' | tr ':' ' ' | awk '{print $2}'`)
#echo "${batch_id_array[@]}"
product_information_array=(`echo $LCIDATA | tr ',' '\n' | grep "_productInformation" | tr -d '"}' | tr ':' ' ' | awk '{print $2}'`)
#echo "${product_information_array[@]}"


for i in "${!supplychain_id_array[@]}";
  do
     #lci_array[i]="supplychainID:${supplychain_id_array[i]} fromEthAddress:${from_eth_address_array[i]} toEthAddress:${to_eth_address_array[i]} batchId:${batch_id_array[i]} productInformation:${product_information_array[i]}"
     ipfsHash_array[i]=$(wget "https://ipfs.io/ipfs/${product_information_array[i]}" -q -O -);
     lci_array[i]="{
   \"SupplychainID\":\"${supplychain_id_array[i]}\",
   \"FromEthAddress\":\"${from_eth_address_array[i]}\",
   \"ToEthAddress\":\"${to_eth_address_array[i]}\",
   \"BatchID\":\"${batch_id_array[i]}\",
   \"ProdInfoHash\":\"${product_information_array[i]}\",
   ${ipfsHash_array[i]:1: -1}
}";
## Getting Data from IPFS
   echo "${lci_array[i]}";
   echo "${lci_array[i]}" >> "completelcidata${i}.json"
  done
