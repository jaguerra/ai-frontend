!define(['jquery'], function(jQuery) {
  'use strict';

  (function(global, $) {

    $.fn.treemenu = function (options) {
      var defaults = {
        classTree: 'ai-treemenu',
        classHasChildren: 'ai-children',
        classCollapsed: 'ai-collapsed',
        classExpanded :'ai-expanded'
      },
      settings = $.extend( {}, defaults, options );

      return this.each(function() {
        var $subtreeNodes = [],
          that = this,
          onNodeClick;

        function isExpanded( $node ) {
          return $node.hasClass( settings.classExpanded );
        }

        function expandNode( $node ) {
          $node.addClass( settings.classExpanded );
          $node.removeClass( settings.classCollapsed );
        }

        function collapseNode( $node ) {
          $node.removeClass( settings.classExpanded );
          $node.addClass( settings.classCollapsed );
        }

        function findSubtreeNodes() {
          $(that).find('li').each(function() {
            if ($(this).find('ul').length > 0) {
              $subtreeNodes.push( $(this) );
            }
          });
        }

        function initNodes() {
          var i;
          for (i=0; i < $subtreeNodes.length; i++) {
            $subtreeNodes[i].addClass( settings.classHasChildren );
            $subtreeNodes[i].children('a').click( onNodeClick );
          }
        }

        function collapseAllNodes() {
          var i;
          for (i=0; i < $subtreeNodes.length; i++) {
            $subtreeNodes[i].addClass( settings.classCollapsed );
            $subtreeNodes[i].removeClass( settings.classExpanded );
          }
        }

        onNodeClick = function ( event ) {
          var $localSubtreeNode = $(this).parent();

          if ( isExpanded( $localSubtreeNode ) ) {
            collapseNode( $localSubtreeNode );
          } else {
            collapseAllNodes();
            expandNode( $localSubtreeNode );
            $localSubtreeNode.parentsUntil( $(that), 'li' ).each(function(){
              expandNode( $(this) );
            });
          }
          event.preventDefault();
          return false;
        }

        findSubtreeNodes();
        if ($subtreeNodes.length > 0) {
          initNodes();
          collapseAllNodes();
          $(this).addClass( settings.classTree );
        }
      });
    };

  }(this, jQuery));

});
