/*
Array.mergeSort implementation for WebKit browsers
Original source from http://en.wikibooks.org/w/index.php?title=Algorithm_Implementation/Sorting/Merge_sort&stable=0#JavaScript
*/
;(function() {

  /*
   * Install a mergeSort implementation since WebKit is still using
   * a slow Array.sort implementation.
   * This was initially taken from: http://en.wikibooks.org/w/index.php?title=Algorithm_Implementation/Sorting/Merge_sort&stable=0#JavaScript
   * But modified by M. Koistinen to actually work and to allow a custom
   * comparator.  This modified version has since been posted to the 
   * above wiki too.
   *
   * This performs about 30% faster *for this use case* in WebKit and is 
   * about the same as FireFox 4's native implementation (which already 
   * uses a Merge Sort implementation).
   *
   */
  
  var defaultComparator = function (a, b) {
  	if (a < b) {
  		return -1;
  	}
		return 1;
  }
      
  Array.prototype.mergeSort = function ( comparator ) {
    var i, j, k,
        firstHalf,
        secondHalf,
        arr1,
        arr2;
    
    if ( !comparator ) { comparator = defaultComparator; }
  
    if (this.length > 1) {
      firstHalf = Math.floor(this.length / 2);
      secondHalf = this.length - firstHalf;
      arr1 = [];
      arr2 = [];

      for (i = 0; i < firstHalf; i++) {
        arr1[i] = this[i];
      }

      for(i = firstHalf; i < firstHalf + secondHalf; i++) {
        arr2[i - firstHalf] = this[i];
      }

      arr1.mergeSort( comparator );
      arr2.mergeSort( comparator );

      i=j=k=0;

      while(arr1.length != j && arr2.length != k) {
        if ( comparator( arr1[j], arr2[k] ) < 0 ) {
          this[i] = arr1[j];
          i++;
          j++;
        } 
        else {
          this[i] = arr2[k];
          i++;
          k++;
        }
      }
      
      while (arr1.length != j) {
        this[i] = arr1[j];
        i++;
        j++;
      }

      while (arr2.length != k) {
        this[i] = arr2[k];
        i++;
        k++;
      }
    }
  }

})();