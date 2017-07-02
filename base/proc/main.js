var blocksCount;

$(document).ready(function () {
    onChangeBlocks(0);

    function onMove(event) {
        if (event.type == Blockly.Events.MOVE) {
            var oldBlocksCount = blocksCount;
            blocksCount = Object.keys(workspace.blockDB_).length;

            if (blocksCount != oldBlocksCount) {
                onChangeBlocks(blocksCount);
            }
        }
    }
    workspace.addChangeListener(onMove);
    
    function onChangeBlocks(count) {
        if (count == 0) {
            $("#execute-btn").prop('disabled', true);
        } else {
            $("#execute-btn").prop('disabled', false);
        }
    }
});

var preCheck = function (xml) {
    //stub

    return true;
};