import { Leaf, MappedLeaf, Branch, TreeScaler } from './decision-tree';

describe('DecisionTree', () => {

  it('should support integer addresses for nodes', () => {
    expect(TreeScaler.integerToAddress(4)).toEqual([0, 0]);
    expect(TreeScaler.integerToAddress(1)).toEqual([]);
    expect(TreeScaler.addressToNumber([])).toEqual(1);
  });

  it('should work...', () => {
    const tree = {
      children: [
        {children: [
          {value: '00'}, {children: [
            {value: '010'}, {value: '011'}
          ]}
        ]}, {value: '1'}
      ]};
    expect(TreeScaler.findLeafForPattern(tree, [], [0, 1]).value).toEqual('010');
    expect(TreeScaler.findLeafForPattern(tree, [], [0]).value).toEqual('00');
    expect(TreeScaler.findLeafForPattern(tree, [1], [0]).value).toEqual('1');
    const tree2 = {
      children: [
        {children: [
          {children: [
            {children: [{value: '0'}, {value: '1'}]},
            {children: [{value: '2'}, {value: '3'}]}
          ]}, {children: [
            {children: [{value: '4'}, {value: '5'}]},
            {children: [{value: '6'}, {value: '7'}]}
          ]}
        ]}, {children: [
          {children: [
            {children: [{value: '8'}, {value: '9'}]},
            {children: [{value: '10'}, {value: '11'}]}
          ]}, {children: [
            {children: [{value: '12'}, {value: '13'}]},
            {children: [{value: '14'}, {value: '15'}]}
          ]}
        ]}
      ]};
    expect(TreeScaler.findLeafForPattern(tree2, [], [0]).value).toEqual('0');
    expect(TreeScaler.findLeafForPattern(tree2, [], [1]).value).toEqual('15');
    expect(TreeScaler.bisectLeft(tree2).value).toEqual('7');
    expect(TreeScaler.bisectRight(tree2).value).toEqual('8');
    const leaf = TreeScaler.bisectRight(tree2);
    const relativeAddress: number[] = [leaf.address[leaf.address.length - 1]];
    const parentAddress: number[] = leaf.address.slice(0, leaf.address.length - 1);
    expect(TreeScaler.getBranchAt(
      <Branch>TreeScaler.getBranchAt(tree2, parentAddress), relativeAddress)['value']
    ).toEqual(leaf['value']);
  });
});

