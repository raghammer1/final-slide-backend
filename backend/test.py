from typing import List


class Solution:
    def successfulPairs(
        self, spells: List[int], potions: List[int], success: int
    ) -> List[int]:
        potions = sorted(potions)
        arr = [0] * len(spells)
        result = []

        for ind, spell in enumerate(spells):
            left, right = 0, len(potions) - 1
            while left <= right:
                mid = (left + right) // 2
                if spell * potions[mid] >= success:
                    right = mid - 1
                else:
                    left = mid + 1

            # left now points to the first potion that forms a successful pair with the spell
            result.append(len(potions) - left)

        return result


sol = Solution()
print(sol.successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7))  # Output: [4, 0, 3]

# arr = [0]*len(spells)

# for ind,i in enumerate(spells):
#     for j in potions:
#         if i*j >= success:
#             arr[ind] += 1

# return arr
