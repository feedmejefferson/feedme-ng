export class Leaf {
  value: string;
}
export class MappedLeaf extends Leaf {
  address: number[];
}
export class Branch {
  children: Array<Branch | Leaf>;
}
export class TreeScaler {
  static findLeafForPattern(branch: Branch, prefix: number[], repeats: number[]): MappedLeaf {
    const address: number[] = [];
    let node = branch;
    let i = 0;
    for (; i < prefix.length && node.children; i++) {
      node = node.children[prefix[i]] as Branch;
      address.push(prefix[i]);
    }
    i = 0;
    while (node.children) {
      node = node.children[repeats[i % repeats.length]] as Branch;
      address.push(repeats[i % repeats.length]);
      i++;
    }

    return <MappedLeaf><unknown>{ ...node, address: address };
  }
  static getBranchAt(startingBranch: Branch, address: number[]): Leaf | Branch {
    let node = startingBranch;
    let i = 0;
    for (; i < address.length && node.children; i++) {
      node = node.children[address[i]] as Branch;
    }
    return node;
  }
  static bisectLeft(branch: Branch): MappedLeaf {
    return TreeScaler.findLeafForPattern(branch, [0], [1]);
  }
  static bisectRight(branch: Branch): MappedLeaf {
    return TreeScaler.findLeafForPattern(branch, [1], [0]);
  }
  static addressToNumber(address: number[]): number {
    return parseInt('1' + address.join(), 2);
  }
  static integerToAddress(integer: number) {
    const address =  integer.toString(2).split('');
    address.shift();
    return address.map(s => parseInt(s, 10));
  }
}
