/**
 * Pre-order traversal of all Mail objects in the reply-thread hierarchy.
 * @param {Object} node Either a Thread top-level object, or an element of a Replies array.
 * @param {Function} visit The "visitor" function, to be invoked once with every Mail object as an argument
 */
function visitMails(node, visit, depth = 0) {
    const { Replies } = node;
    visit(node, depth);

    if(Replies) {
        Replies.forEach(reply => {
            if(reply != null)
                visitMails(reply, visit, depth + 1);
        });
    }
}

module.exports = {
    visitMails
}
